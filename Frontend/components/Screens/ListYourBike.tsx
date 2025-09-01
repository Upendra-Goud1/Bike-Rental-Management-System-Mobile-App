import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from './Home';

const CLOUD_NAME = 'doapwe86g'; // 🔁 Replace with your Cloudinary cloud name
const UPLOAD_PRESET = 'bike_image_upload'; // 🔁 Replace with your unsigned preset

const uploadImageToCloudinary = async (imageUri: string) => {
  try {
    const fileType = imageUri.split('.').pop();

    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: `image/${fileType}`,
      name: `upload.${fileType}`,
    } as any);

    formData.append('upload_preset', UPLOAD_PRESET);


    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/doapwe86g/image/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return null;
  }
};

interface OwnerData {
  name: string;
  email: string;
  mobileNumber: string;
  city: string;
  numberOfBikes: string;
  message: string;
}

interface BikeData {
  name: string;
  brand: string;
  priceperday: string;
  image: string;
}

export default function ListYourBike() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [step, setStep] = useState<'intro' | 'ownerForm' | 'pendingApproval' | 'bikeForm'>('intro');
  const [ownerData, setOwnerData] = useState<OwnerData>({
    name: '',
    email: '',
    mobileNumber: '',
    city: '',
    numberOfBikes: '',
    message: '',
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [bikeData, setBikeData] = useState<BikeData>({
    name: '',
    brand: '',
    priceperday: '',
    image: '',
  });
  const [ownerStatus, setOwnerStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchOwnerStatus = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('ownerEmail');
        if (!storedEmail) return;

        const response = await axios.get(`http://192.168.29.242:5000/api/owner/status?email=${storedEmail}`);
        setOwnerStatus(response.data.status);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          // No request found, show the request form
          setOwnerStatus("not_requested");
        } else {
          console.error("❌ Error fetching owner status:", error);
        }
      }
    };
    fetchOwnerStatus();
  }, []);

  const handleOwnerSubmit = async () => {
    try {
      await axios.post('http://192.168.29.242:5000/api/owner/request-bike', ownerData);
      await AsyncStorage.setItem('ownerEmail', ownerData.email);
      Alert.alert('Submitted', 'Wait for admin confirmation!');
      setStep('pendingApproval');
    } catch (error) {
      console.error("❌ API Error:", error);
      Alert.alert('Error', 'Submission failed');
    }
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
      setBikeData((prev) => ({ ...prev, image: uri }));
    }
  };

  const handleBikeSubmit = async () => {
    if (!selectedImage) {
      Alert.alert("Please select an image first.");
      return;
    }

    const imageUrl = await uploadImageToCloudinary(selectedImage);
    if (!imageUrl) {
      Alert.alert("Image upload failed.");
      return;
    }

    try {
      const newBikeData = {
        ...bikeData,
        image: imageUrl,
        priceperday: Number(bikeData.priceperday),
        createdAt: new Date(),
      };

      await axios.post('http://192.168.29.242:5000/api/owner/submit-bike', newBikeData);

      Alert.alert("Success", "Bike listed successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error submitting bike:", error);
      Alert.alert("Error", "Failed to submit bike.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {step === 'intro' && (
        <View>
          <Text style={styles.heading}>💡 Did you know?</Text>
          <Text style={styles.text}>You can make money by renting your unused two-wheeler!</Text>
          <TouchableOpacity style={styles.customButton} onPress={() => setStep('ownerForm')}>
            <Text style={styles.customButtonText}>Start Earning with Get Bikes</Text>
          </TouchableOpacity>

        </View>
      )}

      {step === 'ownerForm' && (
        <View>
          {ownerStatus === 'approved' ? (
            <View>
              <Text style={styles.successText}>✅ Your request has been approved! Now you can add your bike.</Text>

              <TouchableOpacity style={styles.customButton} onPress={() => setStep('bikeForm')}>
                <Text style={styles.customButtonText}>Add Bike</Text>
              </TouchableOpacity>

            </View>
          ) : ownerStatus === 'pending' ? (
            <Text style={styles.pendingText}>⏳ Your request is pending. Please wait for admin approval.</Text>
          ) : (
            <View>
              <Text style={styles.heading}>👤 Owner Details</Text>
              {Object.keys(ownerData).map((field) => (
                <TextInput
                  key={field}
                  placeholder={field.toUpperCase()}
                  value={String(ownerData[field as keyof OwnerData])}
                  onChangeText={(text) =>
                    setOwnerData({
                      ...ownerData,
                      [field]: field === 'numberOfBikes' || field === 'mobileNumber' ? text.replace(/\D/g, '') : text,
                    })
                  }
                  style={styles.input}
                  keyboardType={field === 'mobileNumber' || field === 'numberOfBikes' ? 'numeric' : 'default'}
                />
              ))}
              <Button title="Submit Owner Info" onPress={handleOwnerSubmit} />
            </View>
          )}
        </View>
      )}

      {step === 'bikeForm' && (
        <View>
          <Text style={styles.heading}>🚲 List Your Bike</Text>
          {Object.keys(bikeData).map((field) =>
            field !== 'image' ? (
              <TextInput
                key={field}
                placeholder={field.toUpperCase()}
                value={bikeData[field as keyof BikeData]}
                onChangeText={(text) => setBikeData({ ...bikeData, [field]: text })}
                style={styles.input}
              />
            ) : null
          )}
          <TouchableOpacity onPress={handleImagePick} style={styles.imagePicker}>
            <Text><Text style={styles.sbiHighlight}>Select Bike Image</Text></Text>
          </TouchableOpacity>
          {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}

          <TouchableOpacity style={styles.customButton} onPress={handleBikeSubmit}>
            <Text style={styles.customButtonText}>Submit Bike</Text>
          </TouchableOpacity>

        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: 'steelblue', },
  input: { borderWidth: 1, padding: 10, marginVertical: 8, borderRadius: 5 },
  text: { fontSize: 16, marginBottom: 20 },
  successText: { fontSize: 18, color: 'green', textAlign: 'center', marginVertical: 10 },
  pendingText: { fontSize: 18, color: 'red', textAlign: 'center', marginVertical: 10 },
  imagePicker: { padding: 10, backgroundColor: '#ddd', marginVertical: 10, alignItems: 'center' },
  image: { width: 200, height: 200, alignSelf: 'center', marginTop: 10 },
  customButton: {
    backgroundColor: 'steelblue',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  customButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sbiHighlight: { color: 'steelblue' },

});
