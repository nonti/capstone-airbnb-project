const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');

// Create a new reservation
router.post('/', reservationController.createReservation);

// Get reservations by host
router.get('/host/:hostId', reservationController.getReservationByHost); // Use :hostId for clarity

// Get reservations by user
router.get('/user/:userId', reservationController.getReservationByUser); // Use :userId for clarity

// Delete a reservation
router.delete('/reservation/:id', reservationController.deleteReservation); // Singular route path for reservation

module.exports = router;
