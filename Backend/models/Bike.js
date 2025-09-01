const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  name: String,
  brand: String,
  location: String,
  priceperday: Number,
  image: String,
  // Add any other fields as needed
}, { timestamps: true });

module.exports = mongoose.models.Bike || mongoose.model('Bike', bikeSchema);
