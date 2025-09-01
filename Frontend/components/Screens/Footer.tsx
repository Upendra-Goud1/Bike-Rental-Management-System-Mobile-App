import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // 👈 Add this line
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types'; // Adjust path based on where your types are

const Footer = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.footerContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Us</Text>
        <Text style={styles.text}>
          GetBike is a trusted platform for renting bikes and scooters easily at affordable rates.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Links</Text>

        <TouchableOpacity onPress={() => navigation.navigate('FAQs')}>
          <Text style={styles.link}>FAQs</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('offers')}>
          <Text style={styles.link}>Offers</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ContactUs')}>
          <Text style={styles.link}>Contact Us</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact</Text>
        <Text style={styles.text}>Email: support@getbike.com</Text>
        <Text style={styles.text}>Phone: +91 98765 43210</Text>
        <Text style={styles.text}>Location: Hyderabad, India</Text>
      </View>

      <Text style={styles.bottomText}>© 2025 GetBike. All rights reserved.</Text>
    </View>
  );
};

export default Footer;


const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: 'steelblue',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 30,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
  },
  link: {
    color: 'yellow',
    fontSize: 14,
    marginBottom: 5,
  },
  bottomText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 12,
    marginTop: 10,
  },
});
