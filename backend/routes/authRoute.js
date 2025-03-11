// routes/auth.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Logout
router.post('/logout', authController.logout);

// Profile (Protected Route)
router.get('/profile', authController.profile);

module.exports = router;
