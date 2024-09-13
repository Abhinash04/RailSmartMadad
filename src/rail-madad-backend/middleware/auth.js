// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};


exports.Auth = async (req, res, next) => {
  try {
    // Access authorization header to validate request
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token format is incorrect" });
    }

    // Retrieve the user details of the logged-in user
    const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decodedToken;

    next(); // Call the next middleware or route handler
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ error: "Authentication Failed" });
  }
};


exports.localVariables = (req, res, next) => {
  req.app.locals = {
    OTP: null,
    resetSession: false
  };
  next();
};