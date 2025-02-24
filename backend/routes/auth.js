const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config'); // PostgreSQL connection

const router = express.Router();

// Mock user data for testing (remove in production)
const mockUser = {
  id: 1,
  email: 'user@example.com',
  password: 'password', // In a real app, store a hashed password
};

// Mock Login Route
router.post('/mock-login', (req, res) => {
  const { email, password } = req.body;

  if (email === mockUser.email && password === mockUser.password) {
    const token = jwt.sign({ id: mockUser.id, email: mockUser.email }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Signup Route
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert user into database
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );

    // Generate JWT token
    const token = jwt.sign({ id: newUser.rows[0].id }, 'secretkey', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) return res.status(400).json({ msg: 'Invalid credentials' });

    // Compare passwords
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) return res.status(400).json({ msg: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ id: user.rows[0].id }, 'secretkey', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
