const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Business = require('../models/Business');

// Signup
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, businessName, phone, address } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists.' });

    // Step 1: Create and save the user
    const newUser = new User({ name, email, password, role: 'business_owner' });
    const savedUser = await newUser.save(); 

    // Step 2: Create business and assign user as owner
    const business = new Business({
      name: businessName,
      email,
      phone,
      address,
      owner: savedUser._id 
    });
    const savedBusiness = await business.save();

    // Step 3: Link business to user
    savedUser.business = savedBusiness._id;
    await savedUser.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: savedUser });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ error: 'Signup failed.' });
  }
});



// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', email);

    const user = await User.findOne({ email }).populate('business');
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Don't send password in response
    const userData = user.toObject();
    delete userData.password;

    res.json({ token, user: userData });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: 'Login failed.' });
  }
});

module.exports = router;
