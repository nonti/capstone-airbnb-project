const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller'); // Adjust the path as necessary

// Create a new reservation
router.post('/', reservationController.createReservation);

// Update an existing reservation
router.put('/reservations/:id', reservationController.updateReservation);

// Delete a reservation
router.delete('/reservations/:id', reservationController.deleteReservation);

module.exports = router;
