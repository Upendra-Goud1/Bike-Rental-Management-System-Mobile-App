import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios'; // ✅ FIX 1
import Navbar from '../../components/Screens/Navbar';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import Footer from './Footer';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  BikeList: undefined;
  BikeBooking: { bike: Bike };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

interface Bike {
  _id?: string; // MongoDB uses _id
  name: string;
  brand: string;
  priceperday: string;
  image: string;
}

export default function Home({ navigation }: HomeScreenProps) {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);

  

const isFocused = useIsFocused();

useEffect(() => {
  if (isFocused) {
    console.log("📡 Re-fetching bikes...");
    axios.get(`http://192.168.29.242:5000/get-bikes`)
      .then(res => {
        setBikes(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Error fetching bikes:", err);
        setLoading(false);
      });
  }
}, [isFocused]);

  
  

  return (
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.title}>Explore Our Bikes</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : bikes.length === 0 ? (
        <Text style={styles.noDataText}>No bikes available</Text>
      ) : (
        <FlatList
          data={bikes.filter(b => b.image)} // only render bikes with images
          keyExtractor={(item, index) => item._id?.toString() || index.toString()}

          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('BikeBooking', { bike: item })}
            >
              <Image
                source={{
                  uri: item.image?.startsWith('http') ? item.image : 'https://via.placeholder.com/150',
                }}
                style={{ width: 200, height: 150, borderRadius: 10 }}
              />
              <Text style={styles.name}>{item.name || "No Name"}</Text>
              <Text style={styles.brand}>🏍️ Brand: {item.brand || "No Brand"}</Text>
              <Text style={styles.price}>💰 ₹{item.priceperday || "N/A"}/day</Text>
            </TouchableOpacity>
          )}
          ListFooterComponent={<Footer />}
        />
        
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
  noDataText: { fontSize: 18, textAlign: 'center', marginTop: 20, color: 'gray' },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  image: { width: 200, height: 150, borderRadius: 10, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: 'bold' },
  brand: { fontSize: 16, color: 'gray' },
  price: { fontSize: 16, fontWeight: 'bold', color: 'steelblue' },
});
