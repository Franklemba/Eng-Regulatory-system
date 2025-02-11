const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: String,
  role: String,
  contact: String,
  regNumber: String
});

const engineeringApplicationSchema = new mongoose.Schema({
  zebraClientId: {
    type: String,
    required: true
  },
  primaryDiscipline: {
    type: String,
    required: true,
    enum: ['civil', 'electrical', 'mechanical', 'structural', 'environmental', 'geotechnical', 'other']
  },
  otherDiscipline: {
    type: String
  },
  technicalDescription: {
    type: String,
    required: true
  },
  designCalculations: {
    type: String,  // File path/URL
    required: false
  },
  engineeringDrawings: [{
    type: String,  // Array of file paths/URLs
    required: false
  }],
  leadEngineer: {
    type: String,
    required: true
  },
  registrationNumber: {
    type: String,
    required: true
  },
  professionalBody: {
    type: String,
    required: true,
    enum: ['EIZ', 'other']
  },
  otherProfessionalBody: {
    type: String
  },
  teamMembers: [teamMemberSchema],
  feasibilityStudy: {
    type: String,  // File path/URL
    required: false
  },
  boqDocument: {
    type: String,  // File path/URL
    required: false
  },
  qaqcPlan: {
    type: String,  // File path/URL
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userId:{
    type: String,  // File path/URL
    required: true
  }
});

// Create indexes for common queries
engineeringApplicationSchema.index({ zebraClientId: 1 });
engineeringApplicationSchema.index({ leadEngineer: 1 });
engineeringApplicationSchema.index({ createdAt: -1 });

const EngineeringApplication = mongoose.model('EngineeringApplication', engineeringApplicationSchema);

module.exports = EngineeringApplication;