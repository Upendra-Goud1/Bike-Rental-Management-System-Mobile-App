import { NativeStackScreenProps } from '@react-navigation/native-stack';

// ✅ Define type for navigation stack
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
  BikeList: undefined;
  BikeBooking: {
    bike: any;
  };
  offers:undefined;
  ListYourBike:undefined;
  ContactUs:undefined;
  FAQs:undefined;
  PaymentScreen: {
    bike: any;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
  }; // 👈 Accepts full booking info
};

// ✅ Define props for each screen
export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;
export type BikeListScreenProps = NativeStackScreenProps<RootStackParamList, 'BikeList'>;
export type BikeBookingScreenProps = NativeStackScreenProps<RootStackParamList, 'BikeBooking'>;
export type offerScreenProps = NativeStackScreenProps<RootStackParamList, 'offers'>;
export type ListYourBikeScreenProps = NativeStackScreenProps<RootStackParamList,'ListYourBike'>;
export type ContactUsScreenProps = NativeStackScreenProps<RootStackParamList,'ContactUs'>;
export type FAQsScreenProps = NativeStackScreenProps<RootStackParamList,'FAQs'>;
export type PaymentScreenScreenProps = NativeStackScreenProps<RootStackParamList,'PaymentScreen'>;
