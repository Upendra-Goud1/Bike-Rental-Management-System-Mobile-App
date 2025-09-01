// components/Screens/Offers.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Offers() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>🎉 <Text style={styles.offersHighlight}>Exclusive Offers</Text></Text>
      <Text style={styles.offer}>• Get 10% OFF on your first booking!</Text>
      <Text style={styles.offer}>• Weekly rental? Enjoy 20% discount!</Text>
      <Text style={styles.offer}>• Refer a friend and earn ₹100 credit.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  offer: { fontSize: 16, marginBottom: 10, color: 'green' },
  offersHighlight: { color: 'steelblue' },
});
