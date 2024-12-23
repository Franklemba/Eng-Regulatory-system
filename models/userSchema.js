const mongoose = require("mongoose");

// Clear the existing model if it exists
if (mongoose.connection.models['client']) {
  delete mongoose.connection.models['client']
}

const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  tradeName: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: false,
    default: null
  },
  mobileNo: {
    type: String,
    required: true,
  },
  contactPerson: {
    type: String,
    required: null,
  },
  street: {
    type: String,
    required: true
  },
  additional: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  place: {
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
  isVerified: {
    type: Boolean,
    required: true,
    default: true
  }
});

module.exports = mongoose.model("client", userSchema);