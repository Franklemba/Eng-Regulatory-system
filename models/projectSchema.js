const mongoose = require('mongoose');

// Schema for project locations
const locationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    description: { type: String, required: true },
});

// Schema for worker details
const workerSchema = new mongoose.Schema({
    professionals: { type: Number, required: true },
    skilled: { type: Number, required: true },
    semiSkilled: { type: Number, required: true },
    unskilled: { type: Number, required: true },
});

// Main project schema
const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    budget: { type: Number, required: true }, // Changed from "budget" to "value"
    duration: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['Planned', 'In Progress', 'Completed', 'On Hold'], 
        default: 'Planned' 
    },
    objectives: { type: String, required: true }, // Project description with objectives
    locations: [locationSchema], // List of project locations
    workers: workerSchema, // Workers schema added
    files: [{ type: String }], // Array to store file paths or URLs
    teamMembers: { type: String }, // Team members as a comma-separated string
    permits: { type: String }, // Associated permits/licenses
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
