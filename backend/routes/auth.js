const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// Mock user data for testing (remove in production)
const mockUser = {
  id: 1,
  email: 'user@example.com',
  password: 'password', // In a real app, store a hashed password
};

// Login route (mock authentication)
router.post('/mock-login', (req, res) => {
  const { email, password } = req.body;

  if (email === mockUser.email && password === mockUser.password) {
    const token = jwt.sign({ id: mockUser.id, email: mockUser.email }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Register and Login routes using PostgreSQL
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
