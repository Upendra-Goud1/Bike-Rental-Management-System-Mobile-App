// models/BikeOwnerRequest.js
const mongoose = require('mongoose');

const bikeOwnerRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Please enter a valid email address'] 
  },
  mobileNumber: { 
    type: String, 
    required: true,
    match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit UPI registered mobile number']
  },
  city: { type: String, required: true },
  numberOfBikes: { type: Number, required: true },
  message: { type: String },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BikeOwnerRequest', bikeOwnerRequestSchema);
