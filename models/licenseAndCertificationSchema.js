const mongoose = require('mongoose');

const PartSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true }
});

const LicenseSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    membershipClass: { type: String, required: true },
    foreignLicense: { type: String, default: "No" },
    additionalInfo: { type: String },
    parts: [PartSchema],
    createdAt: { type: Date, default: Date.now }
});

const License = mongoose.model('LicenseAndCertification', LicenseSchema);

module.exports = License;
