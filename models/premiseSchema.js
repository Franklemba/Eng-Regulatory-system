const mongoose = require("mongoose");

// Clear the existing model if it exists
if (mongoose.connection.models['client']) {
  delete mongoose.connection.models['client']
}

const premiseSchema = new mongoose.Schema({
 
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
  }
});

module.exports = mongoose.model("Premis", premiseSchema);