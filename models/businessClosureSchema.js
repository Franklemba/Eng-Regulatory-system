const mongoose = require("mongoose");

// Clear existing model if it exists
if (mongoose.connection.models['BusinessClosure']) {
  delete mongoose.connection.models['BusinessClosure'];
}

const businessClosureSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
  },
  licenseID: {
    type: String,
    required: true,
  },
  reasonForClosure: {
    type: String,
    required: true,
  },
  closureDate: {
    type: Date,
    required: true,
  },
  finalFinancialStatement: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("BusinessClosure", businessClosureSchema);
