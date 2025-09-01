const express = require('express');
const router = express.Router();
const Bike = require('../models/Bike');

router.get('/get-bikes', async (req, res) => {
  try {
    console.log("📥 Incoming request to /get-bikes");
    const bikes = await Bike.find();
    console.log("✅ Bikes fetched:", bikes.length);
    res.status(200).json(bikes);
  } catch (error) {
    console.error("❌ Error fetching bikes:", error);
    res.status(500).json({ message: 'Failed to fetch bikes' });
  }
});

module.exports = router;
