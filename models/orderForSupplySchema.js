const mongoose = require("mongoose");

// Clear existing model if it exists
if (mongoose.connection.models['OrderForSupply']) {
  delete mongoose.connection.models['OrderForSupply'];
}

const orderForSupplySchema = new mongoose.Schema({
  supplierName: {
    type: String,
    required: true,
  },
  contactPerson: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  expectedDeliveryDate: {
    type: Date,
    required: true,
  },
  priotyLevel: {
    type: String,
    required: true,
  },
  orderDetails: {
    type: String,
    required: true,
  },
  supportingDocument: {
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

module.exports = mongoose.model("OrderForSupply", orderForSupplySchema);
