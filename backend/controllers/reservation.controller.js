const Reservation = require('../models/reservation.model');

const createReservation = async (req, res) => {
  const reservationData = req.body; // Get data from request body
  try {
      const newReservation = new Reservation(reservationData); // Create a new reservation instance
      await newReservation.save(); // Save the reservation to the database
      res.status(201).json({
          message: 'Reservation created successfully!',
          reservation: newReservation
      });
  } catch (error) {
      console.error('Error creating reservation:', error);
      res.status(500).json({ message: 'Error creating reservation', error: error.message });
  }
}

const getReservationByHost = async (req, res) => {
  const { hostId } = req.params; // Get host ID from request parameters

  try {
    // Find reservations by filtering accommodations hosted by the specified host
    const reservations = await Reservation.find().populate({
      path: 'accommodation',
      match: { host: hostId }, // Match host with the provided hostId
    });

    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ message: 'Error fetching reservations', error: error.message });
  }
};

const getReservationByUser = async (req, res) => {
  const { userId } = req.params; // Get user ID from request parameters

  try {
    // Find reservations for the specific user
    const reservations = await Reservation.find({ user: userId }).populate('accommodation'); // Populate accommodation details

    if (!reservations) {
      return res.status(404).json({ message: 'No reservations found for this user' });
    }

    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ message: 'Error fetching reservations', error: error.message });
  }
};



const deleteReservation = async (req, res) => {
  const { id } = req.params; // Get reservation ID from request parameters

  try {
    const deletedReservation = await Reservation.findByIdAndDelete(id); // Delete reservation
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