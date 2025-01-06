const express = require("express");
const router = express.Router();
const dashboardGetController = require("../controllers/dashboardGetController");

router.get("/", dashboardGetController.getDashboard);
router.get("/download/:filename", dashboardGetController.downloadFile);
router.get("/newApplication", dashboardGetController.getNewApplicationPage);
router.get("/newProjectListing", dashboardGetController.getNewProjectListingPage);
router.get("/projectApplicationProgress", dashboardGetController.getProjectApplicationProgress);

router.get("/submittedApplication", dashboardGetController.getSubmittedApplicationPage);
router.get("/submittedPremiseLeasings", dashboardGetController.getSubmittedLeasingsPage);

router.get("/reviewProgress", dashboardGetController.getReviewProgressPage);
router.get("/premiseLeasing", dashboardGetController.getPremiseLeasingPage);
router.get("/annualDeclaration", dashboardGetController.getAnnualDeclarationPage);
router.get("/productCertificationApplication", dashboardGetController.getProductCertificationApplicationPage);
router.get("/productCertificationApplications", dashboardGetController.getProductCertificationApplicationsPage);

// Lembalemba onwards
router.get("/businessClosure", dashboardGetController.getBusinessClosurePage);
router.get("/structuralEnvironmentalLicense", dashboardGetController.getStructuralEnvironmentalLicensePage);
router.get("/structuralEnvironmentalLicenses", dashboardGetController.getStructuralEnvironmentalLicenses);

router.get("/assessment", dashboardGetController.getAssessmentPage);
router.get("/newCompliance", dashboardGetController.getStatutoryCompliance);
router.get("/reviewCompliance", dashboardGetController.getStatutoryComplianceStatus);

router.get("/attachLicense", dashboardGetController.getLicenseAndCertificationsPage);
router.get("/reviewLicense", dashboardGetController.getReviewLicenseAndCertificationsPage);
router.get("/submitForReview", dashboardGetController.sendRequestForReviewEmail);
router.get("/report", dashboardGetController.getReport);
router.get("/profileManagement", dashboardGetController.getProfileManagement);

module.exports = router;
