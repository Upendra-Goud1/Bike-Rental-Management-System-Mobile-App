const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");

const app = express(); // ✅ Initialize Express FIRST
app.use(express.json());
app.use(cors());

// ✅ Firebase Admin Initialization (Check if already initialized)
if (!admin.apps.length) {
  const serviceAccount = require("./firebase-admin.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

console.log("🔥 Firebase Admin SDK initialized successfully!");

// ✅ Import Routes AFTER Initializing Express
app.use("/api/auth", require("./routes/auth"));

// ✅ Configure Mail Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com", // ⚠️ Replace with your actual Gmail
    pass: "your-app-password", // ⚠️ Use a **Google App Password** (not your Gmail password)
  },
});

// ✅ Firebase Cloud Function to Send Email on Booking
exports.sendBookingEmail = functions.firestore
  .document("bookings/{bookingId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();

    const mailOptions = {
      from: "your-email@gmail.com",
      to: data.userEmail, // Ensure `userEmail` exists in Firestore document
      subject: "Bike Rental Confirmation - Payment Required",
      text: `Hello, your booking for ${data.bikeName} is confirmed! 
      Start Date: ${data.startDate}, End Date: ${data.endDate}. 
      Please proceed with payment.`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("✅ Email sent successfully!");
    } catch (error) {
      console.error("❌ Error sending email:", error);
    }
  });

// ✅ Export Express API for Firebase Cloud Functions
exports.api = functions.https.onRequest(app);
