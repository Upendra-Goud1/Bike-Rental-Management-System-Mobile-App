🚴‍♂️ Bike Rental Management System

A cross-platform mobile application built with React Native and Node.js that allows users to rent bikes, owners to list bikes, and admins to manage listings. The system integrates JWT authentication, Cloudinary for image uploads, and MongoDB for data management.

📌 Project Title

Bike Rental Management System

🛠️ Technologies Used
Frontend (Mobile App)

React Native (Expo) – Framework for cross-platform mobile apps.

React Navigation – For navigation stack and screen transitions.

Axios – Handles HTTP requests to the backend.

React Native Image Picker – Allows users to select images from their device.

@react-native-community/datetimepicker – For selecting rental start/end date & time.

Cloudinary – For secure storage & serving of uploaded images.

JWT (JSON Web Tokens) – For secure authentication.

Firebase Authentication – Optional login/signup integration.

Backend

Node.js – Server-side runtime.

Express.js – RESTful API framework.

MongoDB – NoSQL database to store users, bikes, and bookings.

Mongoose – ODM for MongoDB & Node.js.

Cors – Middleware for handling cross-origin requests.

Dotenv – For managing environment variables securely.

Cloud Services

Cloudinary – Image hosting & processing.

MongoDB Atlas / Compass – GUI and cloud support for MongoDB database management.

🎯 Objectives

Develop an efficient mobile app for easy bike rentals.

Provide a platform for bike owners to list their bikes.

Automate bookings, reduce manual work, and improve user experience.

Enable secure payments and real-time bike availability.

Maintain a centralized database for bikes, bookings, and owners.

🚀 Key Features

✅ User Authentication (JWT + Firebase)
✅ Browse & Book Bikes with real-time availability
✅ Bike Listings with images, details, and pricing
✅ Date-Time Picker for bookings
✅ Payment Integration & Booking Confirmation
✅ Admin Approval Workflow for bike listings
✅ "List Your Bike" Owner Form (pre-approval & post-approval)
✅ Cloudinary Integration for secure image uploads
✅ Booking History stored in MongoDB
✅ Responsive, user-friendly UI
✅ Contact Us & FAQ pages

📱 Screens Implemented

Home Screen – Displays available bikes for rent with images, names, and prices/day.

Bike Details Screen – Shows full details of the selected bike.

Bike Booking Screen – Allows date/time selection and proceeds to payment.

Payment Screen – Shows booking summary and lets users confirm payment.

Payment Successful Confirmation – Displays success message & booking details.

User Login & Registration Screens – Secure login/signup with JWT + Firebase.

List Your Bike (Step 1) – Owner info form (name, email, UPI, city, bike count).

Approved Bike Listing Form (Step 2) – Owners upload bike details & images.

Cloudinary Integration – Image upload with preview before submission.

Contact Us & FAQ Pages – For support and common queries.

Admin Panel (MongoDB Compass) – Manual approval for owner bike requests.

✅ Current Functionality Completed

User Registration & Login

JWT Authentication

Browse Bike Listings (Admin + User uploaded)

Date-Time Picker for Booking

Total Price Calculation

Navigate to Payment Screen after booking

Booking Confirmation

Payment Status Page

Owner Form to Request Bike Listing

Admin Approval Flow via MongoDB Compass

Owner Bike Listing Form (Post-approval)

Cloudinary Image Upload

Display Images on Home & Details Screens

Contact Us & FAQ Static Pages

🖼️ Screenshots
1. Home Screen

Displays all available bikes for rent with images, names, and prices/day.
![home](https://github.com/user-attachments/assets/f2bce4c1-647d-4f64-9a90-595c79db39d5)

2. Payment Screen

Shows booking summary and lets users confirm payment.

3. Payment Successful Confirmation

Confirms booking with success message & details.

4. User Login & Registration

Secure user authentication screens.

5. List Your Bike - Owner Form

Form for owners to request bike listing (pre-approval).

6. Approved Bike Listing Form

Full bike details with Cloudinary image upload.

7. Cloudinary Integration

Preview and upload bike images securely.

8. Contact Us & FAQ Pages

For user queries and support.
