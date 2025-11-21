const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', { email, password: password ? 'provided' : 'missing' });
    const user = await User.findOne({ email });
    console.log('User found:', user ? 'yes' : 'no');
    if (!user || !(await user.comparePassword(password))) {
      console.log('Invalid credentials');
      return res.status(401).send({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    console.log('Login successful');
    res.send({ user, token });
  } catch (error) {
    console.log('Login error:', error);
    res.status(400).send(error);
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  res.send(req.user);
});

module.exports = router;