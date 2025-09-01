import { collection, addDoc } from "firebase/firestore";
import { db } from "../components/firebaseConfig";

interface BookingDetails {
  userEmail: string;
  bikeName: string;
  startDate: string;
  endDate: string;
}

export const sendBookingNotification = async (booking: BookingDetails) => {
  try {
    await addDoc(collection(db, "bookings"), booking);
    console.log("Booking details added to Firestore. Email will be sent via Firebase Functions.");
  } catch (error) {
    console.error("Error sending booking notification:", error);
  }
};
