const mongoose = require('mongoose');

const statutoryComplianceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  zppaDocument: {
    type: String,
    required: true
  },
  pacraDocument: {
    type: String,
    required: true
  },
  taxDocument: {
    type: String,
    required: true
  },
  workersCompensation: {
    type: String,
    required: true
  },
  energyRegulation: {
    type: String,
    required: true
  },
  nhimaDocument: {
    type: String,
    required: true
  },
  otherDocuments: [{
    type: String
  }],
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const StatutoryCompliance = mongoose.model('StatutoryCompliance', statutoryComplianceSchema);
module.exports = StatutoryCompliance;