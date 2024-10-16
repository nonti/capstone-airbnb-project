const mongoose = require('mongoose');

// Define a schema for specific ratings if needed
const specificRatingsSchema = new mongoose.Schema({
  cleanliness: { type: Number, required: true },
  communication: { type: Number, required: true },
  checkIn: { type: Number, required: true },
  accuracy: { type: Number, required: true },
  location: { type: Number, required: true },
  value: { type: Number, required: true },
}, { _id: false });

// Define the reservation schema
const reservationSchema = new mongoose.Schema({
  accommodation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Accommodation', // Reference to the Accommodation model
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User making the reservation
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;