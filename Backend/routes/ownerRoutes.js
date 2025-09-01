const express = require('express');
const router = express.Router();
const multer = require('multer');
const Bike = require('../models/Bike');
const BikeOwnerRequest = require('../models/BikeOwnerRequest');
const storage = multer.memoryStorage(); // ✅ This is already declared


// Configure Multer for Memory Storage
const upload = multer({ storage }); // ✅ memory storage already declared above


// API to receive bike details and store image as URL (from Cloudinary)
router.post('/submit-bike', async (req, res) => {
  console.log("✅ Received POST request to /submit-bike");
  try {
    const newBike = new Bike(req.body);
    await newBike.save();
    res.status(201).json({ message: 'Bike submitted successfully' });
  } catch (error) {
    console.error("Error uploading bike:", error);
    res.status(500).json({ message: 'Failed to submit bike' });
  }
});



// ✅ 1. Add New Bike Owner Request
router.post('/request-bike', async (req, res) => {
  const { name, email, mobileNumber, city, numberOfBikes, message } = req.body;

  if (!name || !email || !mobileNumber || !city || !numberOfBikes) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newRequest = new BikeOwnerRequest({
      name,
      email,
      mobileNumber,
      city,
      numberOfBikes,
      message,
    });

    await newRequest.save();
    res.status(201).json({ message: '✅ Request submitted! Wait for admin approval.' });
  } catch (error) {
    console.error('❌ Owner Request Error:', error);
    res.status(500).json({ message: 'Failed to submit request' });
  }
});

// ✅ 2. GET Owner Request Status
router.get('/status', async (req, res) => {
  console.log("🔍 Checking owner status:", req.query.email);
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const ownerRequest = await BikeOwnerRequest.findOne({ email });

    if (!ownerRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json({ status: ownerRequest.status });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ 3. Admin Approval Endpoint (Approve)
router.put('/approve/:id', async (req, res) => {
  try {
    const updatedRequest = await BikeOwnerRequest.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status }, // 'approved' or 'rejected'
      { new: true }
    );

    if (!updatedRequest) return res.status(404).json({ message: 'Request not found' });

    res.json({ message: `Request ${req.body.status}`, request: updatedRequest });
  } catch (error) {
    console.error('❌ Error updating request status:', error);
    res.status(500).json({ message: 'Failed to update request status' });
  }
});

// ✅ 4. Reject Owner Request
router.put('/reject/:id', async (req, res) => {
  try {
    const updated = await BikeOwnerRequest.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Request not found' });

    res.json({ message: 'Request rejected', request: updated });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reject request' });
  }
});




module.exports = router; // ✅ Now this is at the correct place!
