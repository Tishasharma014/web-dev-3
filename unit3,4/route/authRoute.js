const authController = require('../controller/authController');
const express = require('express');
const router = express.Router();

//Register a new user
router.post('/register', authController.registerUser);

module.exports = router;