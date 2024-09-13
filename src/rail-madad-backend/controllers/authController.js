// controllers/authController.js
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
require('dotenv').config();
const bcrypt = require('bcryptjs');

// middleware for  verifyuser


module.exports.verifyUser = async function (req, res, next) {
  try {
    const { username } = req.method === "GET" ? req.query : req.body;

    // Check if the user exists
    let exist = await UserModel.findOne({ username });
    if (!exist) return res.status(404).send({ error: "Can't find User!" });

    next();
  } catch (error) {
    return res.status(500).send({ error: "Authentication Error" });
  }
};


module.exports.register = async function (req, res) {
  try {
     
   const { username, email, phNo, password, profile } = req.body;

   console.log('Received payload:', req.body);
    // Check if username already exists
    const userByUsername = await UserModel.findOne({ username }).exec();
    if (userByUsername) {
      return res.status(400).send({ error: "Please use a unique username" });
    }

    // Check if email already exists
    const userByEmail = await UserModel.findOne({ email }).exec();
    if (userByEmail) {
      return res.status(400).send({ error: "Please use a unique email" });
    }
  
    if (password) {
       // Create a new user
      const user = new UserModel({
        username,
        password,
        profile: profile || '',
        email,
        phNo
      });

      // Save the user to the database
      await user.save();
      console.log('user registered');
      return res.status(201).send({ msg: "User Registered Successfully" });
    } else {
      return res.status(400).send({ error: "Password is required" });
    }
  } catch (error) {
    console.error("Internal Server Error:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports.login = async function (req, res) {
  console.log('Request Body:', req.body); 
  const { email, password } = req.body;

  try {
    // Find the user by email
    UserModel.findOne({ email })
      .then(user => {
        if (!user) {
          console.log('Email not found'); 
          return res.status(404).send({ error: "Email not found" });
        }

        console.log('User found:', user);
        console.log('Provided Password:', password); // Log provided password for debugging
        console.log('Stored Hashed Password:', user.password);
        // Compare the provided password with the stored hashed password
        bcrypt.compare(password, user.password)
          .then(passwordCheck => {
            if (!passwordCheck) {
              console.log('password mismatch');
              return res.status(400).send({ error: "Incorrect password" });
            }

            // Create a JWT token
            const token = jwt.sign({
              _id: user._id,
              username: user.username
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });

            // Send response with the token
            return res.status(200).send({
              msg: "Login Successful!",
              username: user.username,
              token
            });
          })
          .catch(error => {
            console.error("Error comparing passwords:", error);
            return res.status(500).send({ error: "Error comparing passwords" });
          });
      })
      .catch(error => {
        console.error("Error finding user:", error);
        return res.status(500).send({ error: "Error finding user" });
      });
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
};

module.exports.getUser = async function (req, res) {
  const { username } = req.params;
  try {
    if (!username) {
      return res.status(501).send({ error: "Invalid Username" });
    }

    const user = await UserModel.findOne({ username }).exec();
    if (!user) {
      return res.status(501).send({ error: "Couldn't Find the user" });
    }

    const { password, ...rest } = user.toJSON(); // Exclude the password field
    return res.status(201).send(rest);

  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(404).send({ error: "Cannot Find User Data" });
  }
};

module.exports.updateUser = async function (req, res) {
  try {
    // const id = req.query.id;
    const {_id } = req.user;
    console.log("requested user",req.user);
    if (!_id) {
      return res.status(401).send({ error: "User Not Found...!" });
    }
    const updateFields = req.body;
    // Log the request body in backend
    console.log('Request Body:', req.body);

    const result = await UserModel.updateOne({ _id: _id }, { $set: updateFields });
    console.log("result", result);
    if (result.nModified === 0) {
      return res.status(400).send({ error: "No changes were made to the user record" });
    }

    return res.status(201).send({ msg: "Record Updated...." });

  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports.generateOTP = async function (req, res) {
  try {
    req.app.locals.OTP = await otpGenerator.generate(6, { 
      lowerCaseAlphabets: false, 
      upperCaseAlphabets: false, 
      specialChars: false 
    });
    res.status(200).send({ code: req.app.locals.OTP });
  } catch (error) {
    console.error("Error generating OTP:", error);
    res.status(500).send({ error: "Failed to generate OTP" });
  }
};

module.exports.verifyOTP = async function (req, res) {
  try {
    const { code } = req.query;
    
    if (req.app.locals.OTP && parseInt(req.app.locals.OTP) === parseInt(code)) {
      req.app.locals.OTP = null; // Reset the OTP value
      req.app.locals.resetSession = true; // Start session for reset password
      return res.status(200).send({ msg: "Verified Successfully!" });
    }
    
    return res.status(400).send({ error: "Invalid OTP" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).send({ error: "Failed to verify OTP" });
  }
};

module.exports.createResetSession = async function (req, res) {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false;
    return res.status(201).send({ msg: "Access granted" });
  }
  return res.status(440).send({ error: "Session expired" });
};


module.exports.resetPassword = async function (req, res) {
  try {
    // Check if the session is valid
    if (!req.app.locals.resetSession) {
      return res.status(440).send({ error: "Session expired" });
    }
     const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).send({ error: "Username and password are required" });
    }
    // Find user by username
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).send({ error: "Username not found" });
    }

    // Update the user's password directly
    const result = await UserModel.updateOne({ username: user.username }, { password });

    // Check if any document was modified
    if (result.modifiedCount === 0) {
      return res.status(400).send({ error: "No changes were made to the user record" });
    }

    // Reset the session
    req.app.locals.resetSession = false;

    return res.status(200).send({ msg: "Password updated successfully" });

  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};