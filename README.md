# 🚲 Bike Rental Management System

A cross-platform mobile application for renting bikes, built using **React Native (Expo)** with a **Node.js + Express.js + MongoDB** backend. The system allows users to browse and book bikes, while bike owners can list their bikes for rent (with admin approval). Secure authentication, image uploads, and payment flow are included.

---

## 📌 Project Title
**Bike Rental Management System**

---

## 🛠️ Technologies Used

### Frontend (Mobile App)
- **React Native (Expo)** – Framework for cross-platform apps.
- **React Navigation** – Screen transitions and navigation stack.
- **Axios** – HTTP requests to backend.
- **React Native Image Picker** – Select images from device.
- **@react-native-community/datetimepicker** – Rental start & end date/time selection.
- **Cloudinary** – Securely stores and serves uploaded bike images.
- **JWT (JSON Web Tokens)** – User authentication.
- **Firebase Authentication** – Optional login/signup.

### Backend
- **Node.js** – Server-side runtime.
- **Express.js** – RESTful API framework.
- **MongoDB** – NoSQL database for users, bikes, and bookings.
- **Mongoose** – ODM library for MongoDB.
- **Cors** – Handles cross-origin requests.
- **Dotenv** – Manages environment variables securely.

### Cloud Services
- **Cloudinary** – Cloud-based image hosting.
- **MongoDB Atlas / Compass** – Database management (GUI + cloud).

---

## 🎯 Objectives
- Build an efficient mobile app for renting bikes.
- Provide a platform for bike owners to list bikes.
- Automate the booking process to improve user experience.
- Secure payments with real-time availability.
- Maintain a central database for bikes, bookings, and owners.

---

## 🚀 Key Features
- 🔐 **User Authentication** (JWT + Firebase)  
- 📋 **Bike Listings** (with images, details, and pricing)  
- 📅 **Bike Booking** (date/time picker + total price calculation)  
- 💳 **Payment Integration** (booking confirmation)  
- 👨‍💼 **Admin Approval** (bike listings require approval)  
- 📝 **Owner Forms** (pre-approval & post-approval flow)  
- ☁️ **Cloudinary Integration** (image upload & preview)  
- 🕑 **Booking History** (stored in MongoDB)  
- 📱 **Responsive UI** (real-time updates, smooth navigation)  

---

## 📱 Screens Implemented
1. **Home Screen** – Displays all available bikes for rent with images, names, and prices.  
2. **Bike Details Screen** – Shows detailed info of selected bike.  
3. **Bike Booking Screen** – Select rental start & end date/time.  
4. **Payment Screen** – Displays booking summary and payment option.  
5. **Payment Success** – Confirms booking with success message.  
6. **Login/Registration** – Secure authentication screens.  
7. **List Your Bike (Step 1)** – Owner info form before approval.  
8. **List Your Bike (Step 2)** – Full bike details form after approval.  
9. **Cloudinary Upload Screen** – Preview and confirm image uploads.  
10. **Contact Us & FAQ Pages** – Support and common user queries.  
11. **Admin Panel (via MongoDB Compass)** – Approve owner requests.  

---

## ✅ Current Functionality Completed
- User Registration & Login  
- JWT Authentication  
- Browse Bikes (admin + user uploaded)  
- Date-Time Picker for Booking  
- Total Price Calculation  
- Navigate to Payment Screen after booking  
- Booking Confirmation & Payment Status  
- Owner Form for Bike Listing Request  
- Admin Approval Flow via MongoDB Compass  
- Approved Owner Bike Listing Form  
- Cloudinary Image Upload & Preview  
- Display Bike Images on Home & Details Screens  
- Contact Us & FAQ Static Pages  

---

## 📷 Screenshots

### 🏠 Home Screen
Displays all available bikes for rent with images, names, and prices.

![home](https://github.com/user-attachments/assets/ddcfc76e-0963-4a80-96ff-1267bc5e55d6)

### 💳 Payment Screen
Booking summary with option to make payment.

![payment screen](https://github.com/user-attachments/assets/a72c9465-d54b-49d2-b837-4441a7f24de9)

### ✅ Payment Successful
Confirms booking with details and success message.

![Payment Successful Confirmation](https://github.com/user-attachments/assets/53461144-32ad-470e-abed-728556dd7113)

### 🔑 Login & Registration
Secure user login/signup.

![Login](https://github.com/user-attachments/assets/bf390d23-ed16-4b73-891a-5ed99a0a623c)

![Registration Screen](https://github.com/user-attachments/assets/3c5bcf2d-71a6-4064-80c5-f08c2eb8daed)

### 📝 List Your Bike – Owner Form
Bike owners submit name, email, UPI, city, and bike count.

![List Your Bike](https://github.com/user-attachments/assets/e52ea1c2-5ca1-4958-b05c-c3cac0ff8fde)

### 📝 Approved Bike Listing Form
Submit full bike details with Cloudinary image upload.

### ☁️ Cloudinary Upload
Preview image before final submission.
![Upload Bike IMG](https://github.com/user-attachments/assets/81848d46-5599-4a79-8a81-36c26ef1b125)

### 📩 Contact Us & FAQ
Support and common query section.

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repo
```bash
git clone https://github.com/your-username/bike-rental-management-system.git
cd bike-rental-management-system
