const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');

// Create a new reservation
router.post('/', reservationController.createReservation);

// Get reservations by host
router.get('/host', reservationController.getReservationByHost); 

// Get reservations by user
router.get('/user/:userId', reservationController.getReservationByUser); 

// Delete a reservation
router.delete('/:id', reservationController.deleteReservation); 

module.exports = router;
