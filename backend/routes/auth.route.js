const express = require('express');
const {signup, upload, signin} = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signup', upload.single('profileImg'),signup)
router.post('/signin', signin);

module.exports = router;