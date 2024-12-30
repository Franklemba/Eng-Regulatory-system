const mongoose = require("mongoose");

// Clear existing model if it exists
if (mongoose.connection.models['EngineeringLicense']) {
  delete mongoose.connection.models['EngineeringLicense'];
}

const engineeringLicenseSchema = new mongoose.Schema({
  applicantName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
  },
  engineeringFields: {
    type: String,
    required: true,
  },
  licenseType: {
    type: String,
    required: true,
  },
  documents: {
    type: [String], // Array of file paths or URLs
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  status:{
    type: String,
    required: false,
    default:'Pending'
  }
});

module.exports = mongoose.model("EngineeringLicense", engineeringLicenseSchema);
