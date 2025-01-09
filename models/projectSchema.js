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
    CFEdoc: { type: String, required: false },
    pastExperienceRefDoc: { type: String, required: false },
    CFCdoc: { type: String, required: false },
    taxComplianceDoc: { type: String, required: false },
    proofOfAdherenceDoc: { type: String, required: false },
    detailedProjectDoc: { type: String, required: false },
    productSummaryDoc: { type: String, required: false },
    techSpecOverviewDoc: { type: String, required: false },
    commercialInvoice: { type: String, required: false },
    invoiceInstrumentDoc: { type: String, required: false },
    noticeOfAwardDoc: { type: String, required: false }
});

// Main project schema
const projectSchema = new mongoose.Schema({ 
    title: { type: String, required: true },
    projectType: { type: String, required: true },
    projectScope: { type: String, required: true },
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
