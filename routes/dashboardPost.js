const express = require("express");
const router = express.Router();
const upload = require("../utilities/awsConfig");
const dashboardPostController = require("../controllers/dashboardPostController");


router.post("/newApplication", upload.array("documents"), dashboardPostController.submitApplication);
// router.post("/newApplication",dashboardPostController.submitApplication);
router.post("/newProject", dashboardPostController.submitProject);
router.post("/newPremiseLeasing", dashboardPostController.submitPremiseLeasing);
router.post("/newAnnualDeclaration", dashboardPostController.submitAnnualDeclaration);
router.post("/newExportImportApplication", dashboardPostController.submitExportImportApplication);

router.post("/businessClosure", dashboardPostController.submitBusinessClosure);
router.post("/newEnvironmentAndStructuralLicense", dashboardPostController.submitStructuralEnvironmentalLicense);
router.post("/orderForSupply", dashboardPostController.submitOrderForSupply);
router.post("/newAwarenessAdvert", dashboardPostController.submitAwarenessAdvert);
router.post("/newAssessment", dashboardPostController.submitAssessment);

module.exports = router;
