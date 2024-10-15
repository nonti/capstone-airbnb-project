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
  images: {
    type: [String], // Array of image URLs
    required: true
  },
  type: {
    type: String, // Accommodation type (e.g., apartment, house)
    required: true
  },
  location: {
    type: String, // Location of the accommodation
    required: true
  },
  guests: {
    type: Number, // Number of guests
    required: true
  },
  bedrooms: {
    type: Number, // Number of bedrooms
    required: true
  },
  bathrooms: {
    type: Number, // Number of bathrooms
    required: true
  },
  beds: {
    type: Number, // Number of beds
    required: true
  },
  amenities: {
    type: [String], // List of amenities
    required: true
  },
  ratings: {
    type: Number, // Overall rating (if applicable)
    default: 0
  },
  reviews: {
    type: Number, // Total number of reviews
    required: true
  },
  price: {
    type: Number, // Total price for the reservation
    required: true
  },
  title: {
    type: String, // Title of the accommodation
    required: true
  },
  host: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model for the host
    ref: 'User',
    required: true
  },
  accommodation: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Accommodation model
    ref: 'Accommodation',
    required: true
  },
  cleaningFee: {
    type: Number, // Cleaning fee for the reservation
    required: true
  },
  serviceFee: {
    type: Number, // Service fee for the reservation
    required: true
  },
  occupancyTaxes: {
    type: Number, // Taxes related to occupancy
    required: true
  },
  enhancedCleaning: {
    type: Boolean, // Indicates if enhanced cleaning is offered
    default: false
  },
  selfCheckin: {
    type: Boolean, // Indicates if self-check-in is available
    default: false
  },
  description: {
    type: String, // Description of the accommodation
    required: true
  },
  specificRatings: specificRatingsSchema, 
  createdAt: {
    type: Date,
    default: Date.now 
  },
  checkIn: {
    type: Date,
    required: true 
  },
  checkOut: {
    type: Date,
    required: true 
  },
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
