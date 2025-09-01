const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const formRoutes = require('./routes/formRoutes');
const bikeRoutes = require('./routes/bikeRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const Booking = require("./models/Booking"); // Adjust path based on your project
require("dotenv").config();
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-admin.json");
const nodemailer = require("nodemailer");
const path = require('path');
const router = express.Router();


// ✅ Ensure Environment Variables Exist
if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET is missing in environment variables!");
  process.exit(1);
}
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in environment variables!");
  process.exit(1);
}

// ✅ Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
console.log("🔥 Firebase Admin SDK initialized successfully!");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', formRoutes);
app.use('/api/owner', ownerRoutes);
app.use('/', bikeRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// ✅ MongoDB Connection with Error Handling
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// ✅ Middleware to Verify JWT
const verifyToken = (req, res, next) => {
  console.log("🛠 Checking Authorization Header:", req.header("Authorization"));

  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn("❌ No valid Authorization header found");
    return res.status(401).json({ message: "Access Denied. No Token Provided." });
  }

  const token = authHeader.split(" ")[1];
  console.log("✅ Extracted Token:", token);

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token Verified Successfully:", verified);
    req.user = verified;
    next();
  } catch (err) {
    console.error("❌ Invalid Token:", err.message);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token Expired. Please log in again." });
    }
    return res.status(400).json({ message: "Invalid Token" });
  }
};

// ✅ Define User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "user" },
});
const User = mongoose.model("User", userSchema);

// ✅ Test Firebase Route
app.get("/test-firebase", (req, res) => {
  res.json({ message: "Firebase Admin SDK is working!" });
});

// ✅ Register User (POST /add-user)
app.post("/add-user", async (req, res) => {
  try {
    console.log("📥 Request to Register User:", req.body);
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.warn(`⚠️ User already exists: ${email}`);
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    console.log(`✅ User Registered: ${email}`);
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("❌ Error Registering User:", error);
    res.status(500).json({ message: "Error registering user", error });
  }
});

// ✅ Login Route (POST /login)
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`🔑 Login Attempt for: ${email}`);

    const user = await User.findOne({ email });
    if (!user) {
      console.warn(`⚠️ Login failed: User not found -> ${email}`);
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn(`⚠️ Login failed: Incorrect password -> ${email}`);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log(`✅ Login successful: ${email}`);
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("❌ Server error during login:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Protected Route (Requires Authentication)
app.get("/protected-route", verifyToken, (req, res) => {
  console.log("✅ Protected route accessed by:", req.user);
  res.json({ message: "You have accessed a protected route!", user: req.user });
});

// ✅ Default Home Route
app.get("/", (req, res) => {
  res.send("🚀 Welcome to the Bike Rental API!");
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const BookingSchema = new mongoose.Schema({
  userId: String,
  bikeId: String,
  bikeName: String,
  startDate: String,
  endDate: String,
  totalPrice: Number,
});

//const Booking = mongoose.model('Booking', BookingSchema);


// POST route for booking
app.post('/book-bike', async (req, res) => {
  console.log("📥 POST request to /book-bike");
  console.log("📦 Booking request body:", req.body); // ✅ Add this

  try {
    const { bikeId, bikeName, brand, startDateTime, endDateTime, userId, userEmail } = req.body;

    if (!bikeId) {
      return res.status(400).json({ message: "Bike ID is required" });
    }

    const booking = new Booking({
      bikeId,
      bikeName,
      brand,
      startDateTime,
      endDateTime,
      userId,
      userEmail,
    });

    await booking.save();
    res.status(201).json({ message: "Booking created successfully!" });
  } catch (error) {
    console.error("❌ Error saving booking:", error);
    res.status(500).json({ message: "Booking creation failed" });
  }
});





// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
