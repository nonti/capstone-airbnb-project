
const express = require('express');
const router = express.Router();
const { createListing, upload, getListingById, getListing, updateListing} = require('../controllers/accomodation.controller');
const verifyToken = require('../middlewares/authMiddleware');
const authoriseRole = require('../middlewares/roleMiddleware');

router.post('/',  verifyToken, authoriseRole('host'),upload.array('images', 5), createListing);
router.get('/', getListing);
router.get('/:id', getListingById);
router.put('/:id/update', updateListing);
module.exports = router;