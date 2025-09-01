// components/Screens/FAQs.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function FAQs() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>❓ <Text style={styles.faqsHighlight}>Frequently Asked Questions</Text></Text>
      <Text style={styles.q}>Q: How can I book a bike?</Text>
      <Text style={styles.a}>A: Select a bike, choose your dates, and confirm booking.</Text>

      <Text style={styles.q}>Q: What if I cancel a booking?</Text>
      <Text style={styles.a}>A: Cancellations are eligible for a full refund up to 24 hours before start time.</Text>

      <Text style={styles.q}>Q: Can I list my own bike?</Text>
      <Text style={styles.a}>A: Yes! Use the "List Your Bike" page to submit your vehicle.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  q: { fontWeight: 'bold', fontSize: 16, marginTop: 10 },
  a: { fontSize: 15, marginBottom: 10 },
  faqsHighlight: { color: 'steelblue' },
});
