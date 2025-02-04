const Reservation = require('../models/reservation.model');
const Accommodation = require('../models/accommodation.model');
const User = require('../models/user.model'); 

const createReservation = async (req, res) => {
  const { accommodationId, userId, checkInDate, checkOutDate, bookedBy } = req.body; 
  try {
    // Fetch the accommodation to get the listingName
    const accommodation = await Accommodation.findById(accommodationId);
    if (!accommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }

    // Fetch the user to get the username
    const user = await User.findOne({username: bookedBy});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prepare the reservation data
    const reservationData = {
      accommodationId,
      userId, 
      bookedBy: user.username, 
      property: accommodation.listingName, 
      checkInDate,
      checkOutDate,
    };

    // Create a new reservation instance
    const newReservation = new Reservation(reservationData);
    await newReservation.save(); // Save the reservation to the database

    res.status(201).json({
      message: 'Reservation created successfully!',
      reservation: newReservation,
    });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Error creating reservation', error: error.message });
  }
};

const getReservationByHost = async (req, res) => {
  const { hostId } = req.params;

  try {
    const reservations = await Reservation.find()
      .populate(
       'accommodationId')
      .populate('bookedBy', 'username')
      

    const filteredReservations = reservations.filter(reservation => reservation.accommodationId !== null);

    if (filteredReservations.length === 0) {
      return res.status(404).json({ message: 'No reservations found for this host' });
    }

    res.status(200).json(filteredReservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ message: 'Error fetching reservations', error: error.message });
  }
};

const getReservationByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find reservations made by this user
    const reservations = await Reservation.find({ bookedBy: userId })
      .populate('accommodationId')  
      .populate('bookedBy', 'username')  
      .populate('property', 'listingName');

    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ message: 'Error fetching reservations', error: error.message });
  }
};

const deleteReservation = async (req, res) => {
  const { id } = req.params; 

  try {
    const deletedReservation = await Reservation.findByIdAndDelete(id); 
    if (!deletedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.status(200).json({ message: 'Reservation deleted successfully!' });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    res.status(500).json({ message: 'Error deleting reservation', error: error.message });
  }
};

module.exports = { createReservation, getReservationByHost, getReservationByUser, deleteReservation };
