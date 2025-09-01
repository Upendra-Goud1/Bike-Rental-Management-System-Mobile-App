import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../components/Screens/Login';   // Correct case
import Home from '../../components/Screens/Home';     // Correct case
import Register from '../../components/Screens/Register';  // Add Register screen
import BikeList from '../../components/Screens/BikeList';
import BikeBooking from '../../components/Screens/BikeBooking';
import offers from '../../components/Screens/offers';
import ListYourBike from '../../components/Screens/listYourBike';
import ContactUs from '../../components/Screens/ContactUs';
import FAQs from '../../components/Screens/FAQs';
import { RootStackParamList } from '../../components/Types';  // Ensure types.tsx exists


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BikeList" component={BikeList} />
        <Stack.Screen name="BikeBooking" component={BikeBooking} />
        <Stack.Screen name="offers" component={offers}/>
        <Stack.Screen name="ListYourBike" component={ListYourBike}/>
        <Stack.Screen name="ContactUs" component={ContactUs}/>
        <Stack.Screen name="FAQs" component={FAQs}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
