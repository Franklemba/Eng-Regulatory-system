const express = require("express");
const router = express.Router();
const dashboardGetController = require("../controllers/dashboardGetController");

router.get("/", dashboardGetController.getDashboard);
router.get("/newApplication", dashboardGetController.getNewApplicationPage);
router.get("/submittedApplication", dashboardGetController.getSubmittedApplicationPage);
router.get("/reviewProgress", dashboardGetController.getReviewProgressPage);
router.get("/premiseLeasing", dashboardGetController.getPremiseLeasingPage);
router.get("/annualDeclaration", dashboardGetController.getAnnualDeclarationPage);
router.get("/importExportApplication", dashboardGetController.getExportImportApplicationPage);

// Lembalemba onwards
router.get("/businessClosure", dashboardGetController.getBusinessClosurePage);
router.get("/structuralEnvironmentalLicence", dashboardGetController.getStructuralEnvironmentalLicencePage);
router.get("/orderForSupply", dashboardGetController.getOrderForSupplyPage);
router.get("/awarenessAdvert", dashboardGetController.getAwarenessAdvertPage);
router.get("/assessment", dashboardGetController.getAssessmentPage);
router.get("/newCompliance", dashboardGetController.getStatutoryCompliance);
router.get("/reviewCompliance", dashboardGetController.getStatutoryComplianceStatus);

module.exports = router;
