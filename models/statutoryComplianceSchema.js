const mongoose = require("mongoose");

// Clear existing model if it exists
if (mongoose.connection.models['StatutoryCompliance']) {
  delete mongoose.connection.models['StatutoryCompliance'];
}

const statutoryComplianceSchema = new mongoose.Schema({
userEmail: {
    type: String,
    required: true,
    },
  zppaDoc: {
    type: String,
    required: true,
  },
  pacraDoc: {
    type: String,
    required: true,
  },
  workcompDoc: {
    type: String,
    required: true,
  },
  nhimaDoc: {
    type: String,
    required: true,
  },
  erbDoc: {
    type: String,
    required: true,
  },
  others: {
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

module.exports = mongoose.model("StatutoryCompliance", statutoryComplianceSchema);
