// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: [true, "Please provide unique Username"]},
  email: { type: String, required:  [true, "Please provide a unique email"], unique: true },
  phNo: { type: String},
  firstname: { type: String},
  lastname: { type: String},
  address: { type: String},
  profile: { type: String, default: '' },
  password: { type: String, required: [true, "Please provide a password"]},
  googleId: {
    type: String
    },
},{timestamps:true});

// Hash the password before saving the user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password for login
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);