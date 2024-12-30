const mongoose = require('mongoose');

const productCertificationSchema = new mongoose.Schema({
    // Product Information
    productName: {
        type: String,
        required: true
    },
    manufacturerName: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    serialNumber: {
        type: String,
        required: true
    },

    // Origin of the Product
    source: {
        type: String,
        enum: ['local', 'imported'],
        required: true
    },
    countryOfManufacture: {
        type: String,
        required: true
    },

    // Technical Specifications
    productFunctionality: {
        type: String,
        required: true
    },
    standards: [{
        type: String,
        enum: ['ISO', 'ASTM', 'IEC', 'Other']
    }],

    // Attachments (storing file paths)
    productDatasheet: {
        type: String,  // Path to uploaded file
        required: true
    },
    standardCertifications: {
        type: String,  // Path to uploaded file
        required: true
    },
    manufacturerAuthorization: {
        type: String,  // Path to uploaded file
        required: true
    },

    // Declaration and Consent
    applicantName: {
        type: String,
        required: true
    },
    submissionDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    declaration: {
        type: Boolean,
        required: true
    },
    signature: {
        type: String,  // Base64 signature data
        required: true
    },

    // Additional metadata
    status: {
        type: String,
        enum: ['draft', 'submitted', 'under_review', 'approved', 'rejected'],
        default: 'submitted'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Add any pre-save middleware or methods here if needed
productCertificationSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const ProductCertification = mongoose.model('ProductCertification', productCertificationSchema);

module.exports = ProductCertification;