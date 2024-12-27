const express = require("express");
const router = express.Router();
const dashboardDeleteController = require("../controllers/dashboardDeleteController");



router.get("/deleteLicenseApplication/:id", dashboardDeleteController.deleteLicenseApplication);
router.get("/deleteProjectApplication/:id", dashboardDeleteController.deleteProjectApplication);
router.get("/deletePremiseLeasingApplication/:id", dashboardDeleteController.deletePremiseLeasingApplication);
router.get("/deleteImportExportApplication/:id", dashboardDeleteController.deleteImportExportApplication);
router.get("/deleteAnnualDeclarationApplication/:id", dashboardDeleteController.deleteAnnualDeclarationApplication);
router.get("/deleteBusinessClosureApplication/:id", dashboardDeleteController.deleteBusinessClosureApplication);
router.get("/deleteStructuralEnvironmentalLicenseApplication/:id", dashboardDeleteController.deleteStructuralEnvironmentalLicenseApplication);
router.get("/deleteOrderForSupplyApplication/:id", dashboardDeleteController.deleteOrderForSupplyApplication);
router.get("/deleteAwarenessAdvertApplication/:id", dashboardDeleteController.deleteAwarenessAdvertApplication);
router.get("/deleteAssessmentApplication/:id", dashboardDeleteController.deleteAssessmentApplication);

module.exports = router;
