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

const docsSchema = new mongoose.Schema({
    CFEdoc: { type: String, required: true },
    pastExperienceRefDoc: { type: String, required: true },
    CFCdoc: { type: String, required: true },
    taxComplianceDoc: { type: String, required: true },
    proofOfAdherenceDoc: { type: String, required: true },
    detailedProjectDoc: { type: String, required: true },
    productSummaryDoc: { type: String, required: true },
    techSpecOverviewDoc: { type: String, required: true },
    commercialInvoice: { type: String, required: true },
    invoiceInstrumentDoc: { type: String, required: true }
});

// Main project schema
const projectSchema = new mongoose.Schema({ 
    title: { type: String, required: true },
    projectType: { type: String, required: true },
    projectValue: { type: Number, required: true }, // Changed from "budget" to "value"
    duration: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['Planned', 'In Progress', 'Completed', 'On Hold'], 
        default: 'Planned' 
    },
    userId:{ type: String, required: true },
    objectives: { type: String, required: true }, // Project description with objectives
    locations: [locationSchema], // List of project locations
    workers: workerSchema, // Workers schema added
    documents: docsSchema, // List of documents
    files: [{ type: String }], // Array to store file paths or URLs
 
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
