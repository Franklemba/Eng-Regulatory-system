const mongoose = require("mongoose");

// Clear the existing model if it exists
if (mongoose.connection.models['client']) {
  delete mongoose.connection.models['client']
}

const userSchema = new mongoose.Schema({
  nameOfEntity: {
    type: String,
    required: true,
  },
  typeOfEntity: {
    type: String,
    required: true,
  },
  businessRegistrationNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  // New fields for OTP verification
  verificationOTP: {
    type: String,
    required: false
  },
  otpExpiration: {
    type: Date,
    required: false
  },
  isEmailVerified: {
    type: Boolean,
    required: true,
    default: true
  },
  accountStatus:{
    type:String,
    default:'Pending Zepra Approval'
  }
});

module.exports = mongoose.model("client", userSchema);