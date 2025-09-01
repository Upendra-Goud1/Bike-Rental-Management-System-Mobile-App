const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

// List Your Bike

// ✅ Contact Us - Corrected path
router.post('/contact', async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const message = new ContactMessage(req.body);
    await message.save();
    res.status(201).json({ message: 'Message received!' });
  } catch (error) {
    console.error('❌ Contact Us Error:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

module.exports = router;
