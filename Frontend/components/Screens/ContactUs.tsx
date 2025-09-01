import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet,TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async () => {
    const { name, email, message } = form;

    if (!name || !email || !message) {
      Alert.alert('⚠️ Validation Error', 'All fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('📧 Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (message.length < 10) {
      Alert.alert('✉️ Message Too Short', 'Please enter at least 10 characters in your message.');
      return;
    }

    try {
      await axios.post('http://192.168.29.242:5000/api/contact', form);
      Alert.alert('📩 Sent', 'Thanks for contacting us!');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('❌ Error sending contact form:', error);
      Alert.alert('❌ Error', 'Message failed to send.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📞 <Text style={styles.contactHighlight}>Contact Us</Text></Text>
      {['name', 'email', 'message'].map((field) => (
        <TextInput
          key={field}
          placeholder={field.toUpperCase()}
          value={form[field as keyof typeof form]}
          onChangeText={(text) => setForm({ ...form, [field]: text })}
          multiline={field === 'message'}
          numberOfLines={field === 'message' ? 4 : 1}
          style={styles.input}
        />
      ))}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
      <Text style={styles.buttonText}>Send Message</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginVertical: 8, borderRadius: 5 },
  contactHighlight: { color: 'steelblue' }, // iOS blue or choose your brand color
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
