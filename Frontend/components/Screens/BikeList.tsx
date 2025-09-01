import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// ✅ Define the types for navigation routes
type RootStackParamList = {
  BikeBooking: { bike: any };  // ✅ Define BikeBooking route with bike param
  // Add other screens here if needed
};

export default function BikeList() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>(); // ✅ Correct navigation type
  const [bikes, setBikes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'bikes'));
        const bikeList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched Bikes:", bikeList);
        setBikes(bikeList);
      } catch (error) {
        console.error('Error fetching bikes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBikes();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : bikes.length === 0 ? (
        <Text style={styles.noDataText}>No bikes available</Text>
      ) : (
        <FlatList
          data={bikes}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.card} 
              onPress={() => navigation.navigate('BikeBooking', { bike: { ...item, totalPrice: item.priceperday } })}
               // ✅ TypeScript will now recognize this
            >
              <Image 
                source={{ uri: item.imageUrl || "https://via.placeholder.com/200" }} 
                style={styles.image} 
              />
              <Text style={styles.name}>{item.name || "No Name"}</Text>
              <Text style={styles.brand}>🏍️ Brand: {item.brand || "No Brand"}</Text>
              <Text style={styles.price}>💰 ₹{item.priceperday || "N/A"}/day</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  noDataText: { fontSize: 18, textAlign: 'center', marginTop: 20, color: 'gray' },
  card: { backgroundColor: '#f9f9f9', borderRadius: 10, padding: 15, marginBottom: 15, alignItems: 'center', elevation: 3 },
  image: { width: 200, height: 150, borderRadius: 10, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: 'bold' },
  brand: { fontSize: 16, color: 'gray' },
  price: { fontSize: 16, fontWeight: 'bold', color: 'green' },
});
9