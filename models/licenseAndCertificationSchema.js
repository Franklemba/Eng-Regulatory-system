const mongoose = require('mongoose');


const LicenseSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    membershipClass: { type: String, required: true },
    country: { type: String, default: "No" },
    additionalInfo: { type: String },
    subcontractor: { type: String },
    licenseAndCertificationDoc: { type: String, required: true },
    userId:{ type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const License = mongoose.model('LicenseAndCertification', LicenseSchema);

module.exports = License;
