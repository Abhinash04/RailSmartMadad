// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken')
//const { registerUser } = require('../controllers/authController');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User'); // Import your User model
//const { loginUser } = require('../controllers/authController');

const router = express.Router();
const client = new OAuth2Client('399095721277-gjvnk7v913vskelfa9kl170btoqec0fa.apps.googleusercontent.com');
const JWT_SECRET = '58803a1b73acc75b349b3a5fcfb5ef7d57b83e572a5f0ca63596bfd74155d251';
//router.post('/signup', registerUser);
//router.post('/login', loginUser);
router.post('/google-signup', async (req, res) => {
  const { tokenId } = req.body;
  console.log('Received credential:', tokenId);

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: '399095721277-gjvnk7v913vskelfa9kl170btoqec0fa.apps.googleusercontent.com',
    });
    const { name, email, sub } = ticket.getPayload();

    // Check if user already exists
    let user = await User.findOne({ email });
    if (!user) {
      // Create new user
      user = new User({ username: name, email, googleId: sub });
      await user.save();
    }
 
    const jwtToken = jwt.sign({ id: user._id },JWT_SECRET , { expiresIn: '1h' });

    res.status(200).json({ message: 'Signed up successfully', token: jwtToken});
  } catch (error) {
    res.status(400).json({ message: 'Google sign-in failed', error });
  }
});


module.exports = router;