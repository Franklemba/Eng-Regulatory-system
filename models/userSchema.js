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
    default: false
  },
  accountStatus:{
    type:String,
    default:'Pending Zepra Approval'
  },
  zepraId:{
    type: String,
    default: generateZepraId
  }

});


function generateZepraId (){
  // Get current year
  const year = new Date().getFullYear();
  
  // Generate random components
  const sequence = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  const engineeringCode = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  // Generate a random letter (A-Z)
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  
  // Combine all parts: ZEPRA-YEAR-SEQUENCE-CODE-LETTER
  // Example output: ZEPRA-2025-4527-089-X
  return `ZEPRA-${year}-${sequence}-${engineeringCode}-${letter}`;
};



module.exports = mongoose.model("client", userSchema);