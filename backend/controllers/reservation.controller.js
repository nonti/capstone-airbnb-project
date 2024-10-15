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


const updateReservation = async (req, res) => {
  const { id } = req.params; // Get reservation ID from request parameters
  const reservationData = req.body; // Get updated data from request body

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(id, reservationData, { new: true, runValidators: true }); // Update reservation
    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.status(200).json({
      message: 'Reservation updated successfully!',
      reservation: updatedReservation
    });
  } catch (error) {
    console.error('Error updating reservation:', error);
    res.status(500).json({ message: 'Error updating reservation', error: error.message });
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
}



module.exports = { createReservation, updateReservation, deleteReservation };