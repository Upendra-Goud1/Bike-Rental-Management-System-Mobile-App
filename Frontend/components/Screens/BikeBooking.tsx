import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert, Platform,TouchableOpacity, } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import axios from 'axios';
import { format } from 'date-fns';
import { getAuth } from "firebase/auth";
import { RootStackParamList } from '../Types'; // Adjust path if needed
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type BikeBookingNavProp = NativeStackNavigationProp<RootStackParamList, 'BikeBooking'>;
type BikeBookingRouteProp = RouteProp<RootStackParamList, 'BikeBooking'>;

export default function BikeBooking() {
  const navigation = useNavigation<BikeBookingNavProp>();
  const route = useRoute<BikeBookingRouteProp>();
  const { bike } = route.params;

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [activePicker, setActivePicker] = useState<'start' | 'end' | null>(null);

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || (activePicker === 'start' ? startDate : endDate);
    if (activePicker === 'start') {
      setStartDate(currentDate);
    } else if (activePicker === 'end') {
      setEndDate(currentDate);
    }
    setShowStart(false);
    setShowEnd(false);
  };

  const showDatePicker = (type: 'start' | 'end') => {
    setActivePicker(type);
    if (type === 'start') {
      setShowStart(true);
    } else {
      setShowEnd(true);
    }
    setMode('date');
  };

  const calculateTotalPrice = () => {
    const timeDiff = endDate.getTime() - startDate.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return days > 0 ? days * bike.priceperday : bike.priceperday;
  };

  const goToPayment = () => {
    navigation.navigate('PaymentScreen', {
      bike,
      startDate,
      endDate,
      totalPrice: calculateTotalPrice(),
    });
  };
  

  const bookBike = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (!user) {
      Alert.alert("User not logged in", "Please log in to book a bike.");
      return;
    }
  
    try {
      const response = await fetch(`http://192.168.29.242:5000/book-bike`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bikeId: bike._id,
          bikeName: bike.name,
          brand: bike.brand,
          startDateTime: startDate,
          endDateTime: endDate,
          userId: user.uid,
          userEmail: user.email,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Alert.alert("✅ Success", "Booking created successfully!");
        navigation.goBack();
      } else {
        Alert.alert("❌ Failed", data.message || "Failed to create booking");
      }
    } catch (error) {
      console.error("Error booking bike:", error);
      Alert.alert("❌ Error", "An error occurred while booking the bike");
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            bike.image && bike.image.startsWith('http')
              ? bike.image
              : 'https://via.placeholder.com/150', // fallback placeholder image
        }}
        style={{ width: 200, height: 150, borderRadius: 10 }}
      />

      <Text style={styles.name}>{bike.name}</Text>
      <Text style={styles.brand}>🏍️ Brand: {bike.brand}</Text>
      <Text style={styles.price}>💰 Price per day: ₹{bike.priceperday}</Text>

      <Text style={styles.label}>Start Date & Time:</Text>
      <Button title="Choose Start Date & Time" onPress={() => showDatePicker('start')} />
      <Text style={styles.label}>
        📅 Start: {format(new Date(startDate), 'dd MMM yyyy, hh:mm a')}
      </Text>


      <Text style={styles.label}>End Date & Time:</Text>
      <Button title="Choose End Date & Time" onPress={() => showDatePicker('end')} />
      <Text style={styles.label}>
        🕒 End: {format(new Date(endDate), 'dd MMM yyyy, hh:mm a')}
      </Text>


      {(showStart || showEnd) && (
        <DateTimePicker
          value={activePicker === 'start' ? startDate : endDate}
          mode={mode}
          display="default"
          onChange={onChange}
        />
      )}

      <Text style={styles.totalPrice}>📌 Total Price: ₹{calculateTotalPrice()}</Text>
      
      <TouchableOpacity style={styles.button} onPress={goToPayment}>
            <Text style={styles.buttonText}>Confirm Booking</Text>
            </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', alignItems: 'center' },
  image: { width: 250, height: 200, borderRadius: 10, marginBottom: 10 },
  name: { fontSize: 22, fontWeight: 'bold' },
  brand: { fontSize: 18, color: 'gray' },
  price: { fontSize: 18, fontWeight: 'bold', color: 'steelblue', marginBottom: 10 },
  label: { fontSize: 16, marginTop: 10 },
  totalPrice: { fontSize: 20, fontWeight: 'bold', color: 'green', marginTop: 10 },
  button: {
    backgroundColor: 'steelblue', // Green or any color you like
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
