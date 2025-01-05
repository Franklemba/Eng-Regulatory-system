const mongoose = require("mongoose");

// Clear existing model if it exists
if (mongoose.connection.models['ReviewRequest']) {
  delete mongoose.connection.models['ReviewRequest'];
}

const ReviewRequestSchema = new mongoose.Schema({
  requestCount: {
    type: Number,
  },
  userId: {
    type: String,
    required: true,
  },
  lastRequestDate: {
    type: Date,
    default: Date.now,
  }
});

ReviewRequestSchema.pre('save', function(next) {
  this.lastRequestDate = Date.now();
  next();
});
module.exports = mongoose.model("ReviewRequest", ReviewRequestSchema);
