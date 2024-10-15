const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  listingName: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, required: true },
  bedrooms: { type: Number, required: true, min: 1 },
  bathrooms: { type: Number, required: true, min: 1 },
  beds: { type: Number, required: true, min:1},
  guests: { type: Number, required: true, min: 1 },
  amenities: { type: [String], default:[]  },
  images: { type: [String], default: [] },
  checkin:{ type: Date, default: new Date},
  checkout:{ type: Date, default: new Date},
  weeklyDiscount: { type: Number, default: 0 },
  cleaningFee: { type: Number, default: 0 },
  serviceFee: { type: Number, default: 0 },
  occupancyTaxesFees: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  
  createdAt: { type: Date, default: Date.now },
});

const Accommodation = mongoose.model("Accommodation", accommodationSchema);
module.exports = Accommodation; 