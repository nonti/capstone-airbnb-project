const express = require('express');
const verifyToken = require('../middlewares/authMiddleware');
const authoriseRole = require('../middlewares/roleMiddleware');
const {signup, upload, signin} = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signup',upload.single('profileImg'),signup)
router.post('/signin', signin);

module.exports = router;