import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { LoginScreenProps } from '../Types'; // Import navigation props
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Save user email in AsyncStorage
      await AsyncStorage.setItem('ownerEmail', email);
      navigation.navigate('Home'); // Navigate to Home after successful login
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <Button title="Login" onPress={handleLogin} />
      <Text onPress={() => navigation.navigate('Register')} style={styles.link}>
        Don't have an account? Sign Up
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  link: {
    marginTop: 10,
    color: 'blue',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
