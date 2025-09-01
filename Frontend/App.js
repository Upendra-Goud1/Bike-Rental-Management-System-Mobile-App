import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Screens/Login'; // Make sure the path is correct
import Home from './components/Screens/Home';   // Make sure the path is correct
import Register from './components/Screens/Register';
import BikeList from './components/Screens/BikeList';
import BikeBooking from './components/Screens/BikeBooking';
import offers from './components/Screens/offers';
import ListYourBike from './components/Screens/ListYourBike';
import ContactUs from './components/Screens/ContactUs';
import FAQs from './components/Screens/FAQs';
import PaymentScreen from './components/Screens/PaymentScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="BikeList" component={BikeList} />
        <Stack.Screen name="BikeBooking" component={BikeBooking} />
        <Stack.Screen name="offers" component={offers} />
        <Stack.Screen name="ListYourBike" component={ListYourBike} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="FAQs" component={FAQs} />
        <Stack.Screen name='PaymentScreen' component={PaymentScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
