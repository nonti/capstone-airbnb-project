
const Accommodation = require('../models/accommodation.model')
const User = require('../models/user.model')
const path = require('path')
const multer = require('multer');
const fs = require('fs');

// Middleware for file upload using multer
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, path.join(__dirname, '../public/uploads/'));
  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });
//create lissting
const createListing = async (req, res) => { // Added req and res parameters
  try {
        
    const {
      title,
      location,
      listingName,
      price,
      description,
      bedrooms,
      bathrooms,
      beds,
      guests,
      amenities,
      checkin,
      checkout,
      weeklyDiscount,
      cleaningFee,
      serviceFee,
      occupancyTaxesFee,
      total,
      hostId
    } = req.body;

    const host = await User.findById(hostId); // Corrected method name
    const photos = req.files; // Corrected variable name
    if (!photos) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const photosPath = photos.map((file) => file.path); // Corrected variable name

    const newAccommodation = new Accommodation({
      host,
      title,
      location,
      listingName,
      price,
      description,
      bedrooms,
      bathrooms,
      beds,
      guests,
      amenities,
      images: photosPath, // Assuming you want to store the image paths
      checkin,
      checkout,
      weeklyDiscount,
      cleaningFee,
      serviceFee,
      occupancyTaxesFee,
      total,
    });

    await newAccommodation.save();
    res.status(201).json({ message: 'Listing created successfully', accommodation: newAccommodation });
  } catch (err) {
    res.status(409).json({ message: "Failed to create the listing", error: err.message }); // Changed to error
    console.log(err);
  }
};



//get listing
const getListing = async (req, res) => { // Make sure to add req and res
  try {
    const accommodations = await Accommodation.find().populate('host', 'username').exec();
    res.status(200).json(accommodations);
  } catch (err) {
    res.status(404).json({ message: 'Failed to get accommodations', error: err.message }); // Changed to error
    console.log(err);
  }
};

//get listing by id
const getListingById = async (req, res) => { 
  const {id} = req.params;
  try {
    console.log("Fetching accommodation by ID:", req.params.id); // Log the ID
    const accommodation = await Accommodation.findById(req.params.id);
   
    if (!accommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }
    res.status(200).json(accommodation);
  } catch (err) {
    res.status(404).json({ message: 'Failed to get accommodation', error: err.message });
    console.log("Error fetching accommodation:", err);
  }
};


//update listing
const updateListing = async (req, res) => {
  try {
    const {
      title, location, listingName, price,
      description, bedrooms, bathrooms, beds, guests, amenities
    } = req.body;

    // Update the listing using the id from req.params.id
    const updatedAccommodation = await Accommodation.findByIdAndUpdate(req.params.id, {
      title, location, listingName, price, description, bedrooms,
      bathrooms, beds, guests, amenities,
    }, { new: true });

    if (!updatedAccommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }

    // Respond with the updated accommodation
    res.status(200).json(updatedAccommodation);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update accommodation', error: err.message });
    console.log(err);
  }
};
module.exports = {createListing, upload, getListing, getListingById, updateListing};