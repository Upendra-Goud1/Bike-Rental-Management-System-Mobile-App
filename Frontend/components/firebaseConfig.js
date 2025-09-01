import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBHofyOg2N2Xx3R1RrJGlDchP-ksKqPABM",
  authDomain: "bikerental-69818.firebaseapp.com",
  projectId: "bikerental-69818",
  storageBucket: "bikerental-69818.firebasestorage.app",
  messagingSenderId: "823633770438",
  appId: "1:823633770438:web:0277e99bdb3cd53c2ea4c7"
};


// ✅ Ensure Firebase is initialized only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ✅ Use AsyncStorage for auth persistence
const auth = getApps().length === 0
  ? initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) })
  : getAuth(app);

const db = getFirestore(app);

export { auth, db };
