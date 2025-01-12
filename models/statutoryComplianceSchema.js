const mongoose = require('mongoose');


const statutoryComplianceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
 
  zppaDocument: {
    type: String,
    required: false
  },
  pacraDocument: {
    type: String,
    required: false
  },
  taxDocument: {
    type: String,
    required: false
  },
  workersCompensation: {
    type: String,
    required: false
  },
  energyRegulation: {
    type: String,
    required: false
  },
  nhimaDocument: {
    type: String,
    required: false
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