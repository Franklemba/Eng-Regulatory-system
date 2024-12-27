const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    description: { type: String, required: true },
});

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    budget: { type: Number, required: true },
    duration: { type: Number, required: true },
    status: { type: String, enum: ['Planned', 'In Progress', 'Completed', 'On Hold'], default: 'Planned' },
    objectives: { type: String, required: true },
    locations: [locationSchema],
    files: [{ type: String }], // Store file paths or URLs
    team_members: { type: String },
    permits: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
