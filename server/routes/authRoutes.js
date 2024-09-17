const express = require('express');
const { register, login,updateUser } = require('../controllers/authController');
const router = express.Router();
// Register route
router.post('/register', register);
const protect = require('../middleware/authMiddleware'); // Ensure the correct path to your middleware file
// Login route
router.post('/login', login);
router.put('/update', protect, updateUser);

module.exports = router;
