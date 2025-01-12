
const mongoose = require("mongoose");

// Clear existing model if it exists
if (mongoose.connection.models['StructuralEnvironmentalLicence']) {
  delete mongoose.connection.models['StructuralEnvironmentalLicence'];
}

const structuralEnvironmentalLicenceSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: false,
  },
  projectID: {
    type: String,
    required: false,
  },
  isEIArequired: {
    type: String,
    required: true,
  },
  localEcosystemImpactDescription: {
    type: String,
    required: true,
  },
  structuralSafetyStandards: {
    type: String,
    required: true,
  },
  structureType: {
    type: String,
    required: true,
  },
  structuralIntegrityEvaluationReport: {
    type: String,
    required: false,
  },
  environmentImpactMitigationPlan: {
    type: String,
    required: false,
  },
  environmentalAssessDetails: {
    type: String,
    required: true,
  },
  structuralSafetyDetails: {
    type: String,
    required: true,
  },
  emergencyResponsePlan: {
    type: String,
    required: true,
  },
  supportingDocument: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  userId:{ type: String, required: true }
});

module.exports = mongoose.model("StructuralEnvironmentalLicence", structuralEnvironmentalLicenceSchema);
