const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');
const verifyToken = require('../middlewares/authMiddleware');
const authoriseRole = require('../middlewares/roleMiddleware');

// Create a new reservation
router.post('/', reservationController.createReservation);

// Get reservations by host
router.get('/host/:hostId', reservationController.getReservationByHost); 

// Get reservations by user
router.get('/user/:userId', reservationController.getReservationByUser); 
  
// Delete a reservation
router.delete('/delete/:id', reservationController.deleteReservation); 

module.exports = router;
