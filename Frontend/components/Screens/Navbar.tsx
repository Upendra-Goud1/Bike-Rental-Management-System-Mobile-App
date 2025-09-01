import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

// Define navigation stack types
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  BikeList: undefined;
  offers: undefined;
  ListYourBike: undefined;
  ContactUs: undefined;
  FAQs: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout Error:', (error as Error).message);
    }
  };

  const handleNavigate = (screen: keyof RootStackParamList) => {
    setMenuVisible(false);
    navigation.navigate(screen);
  };

  return (
    <View style={styles.navbar}>
      {/* Hamburger Menu Button */}
      <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.menuButton}>
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>

      {/* App Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.logoText}>Get Bikes</Text>
      </View>

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Menu Modal */}
      <Modal transparent animationType="fade" visible={menuVisible} onRequestClose={() => setMenuVisible(false)}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPressOut={() => setMenuVisible(false)}>
          <View style={styles.menu}>
            <TouchableOpacity onPress={() => handleNavigate('offers')}>
              <Text style={styles.menuItem}>🚀 Offers</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigate('ListYourBike')}>
              <Text style={styles.menuItem}>🏍️ List Your Vehicle</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigate('ContactUs')}>
              <Text style={styles.menuItem}>📞 Contact Us</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigate('FAQs')}>
              <Text style={styles.menuItem}>❓ FAQs</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor: 'steelblue',
  },
  menuButton: {
    padding: 10,
  },
  menuIcon: {
    fontSize: 24,
    color: '#fff',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoutButton: {
    padding: 10,
  },
  logoutText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  menuItem: {
    fontSize: 18,
    paddingVertical: 12,
    fontWeight: 'bold',
    color: 'steelblue',
  },
});
