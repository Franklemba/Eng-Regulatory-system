const mongoose = require("mongoose");

// Clear the existing model if it exists
if (mongoose.connection.models['client']) {
  delete mongoose.connection.models['client']
}

const clientsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
    default: null
  },
  message: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("client", clientsSchema);