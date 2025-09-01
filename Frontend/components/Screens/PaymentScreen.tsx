// components/Screens/PaymentScreen.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';

export default function PaymentScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { bike, startDate, endDate, totalPrice } = route.params as any;

  const handlePayment = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("User not logged in", "Please log in to continue.");
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
        Alert.alert("✅ Payment Successful", "Booking confirmed!");
        navigation.goBack(); // or navigate.goBack()
      } else {
        Alert.alert("❌ Booking Failed", data.message || "Try again later");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("❌ Error", "Something went wrong during booking.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: bike.image }} style={styles.image} />
      <Text style={styles.title}>{bike.name}</Text>
      <Text>🏍️ Brand: {bike.brand}</Text>
      <Text>📅 Booking: {new Date(startDate).toLocaleString()} → {new Date(endDate).toLocaleString()}</Text>
      <Text style={styles.price}>💰 Total: ₹{totalPrice}</Text>

      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Make Payment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  image: { width: 250, height: 150, borderRadius: 10, marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  price: { fontSize: 20, fontWeight: 'bold', color: 'green', marginVertical: 10 },
  button: {
    backgroundColor: 'steelblue',
    padding: 12,
    borderRadius: 5,
    marginTop: 15,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
