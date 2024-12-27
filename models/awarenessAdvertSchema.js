const mongoose = require("mongoose");

// Clear existing model if it exists
if (mongoose.connection.models['AwarenessAdvert']) {
  delete mongoose.connection.models['AwarenessAdvert'];
}

const awarenessAdvertSchema = new mongoose.Schema({
  advertTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
 
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  targetAudience: {
    type: String,
    required: true,
  },
  advertMedia: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("AwarenessAdvert", awarenessAdvertSchema);
