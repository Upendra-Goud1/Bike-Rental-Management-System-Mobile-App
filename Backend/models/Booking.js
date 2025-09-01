const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bikeId: String,
  bikeName: String,
  brand: String,
  startDateTime: Date,
  endDateTime: Date,
  userId: String,
  userEmail: String,
}, { timestamps: true });

module.exports = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
