const express = require("express");
const router = express.Router();
const dashboardDeleteController = require("../controllers/dashboardDeleteController");



router.get("/deleteApplication/:id", dashboardDeleteController.deleteApplication);
router.get("/deleteProductCertification/:id", dashboardDeleteController.deleteProductCertification);

// router.get("/deleteProjectApplication/:id", dashboardDeleteController.deleteProjectApplication);
// router.get("/deletePremiseLeasingApplication/:id", dashboardDeleteController.deletePremiseLeasingApplication);

// router.get("/deleteAnnualDeclarationApplication/:id", dashboardDeleteController.deleteAnnualDeclarationApplication);
// router.get("/deleteBusinessClosureApplication/:id", dashboardDeleteController.deleteBusinessClosureApplication);
// router.get("/deleteStructuralEnvironmentalLicenseApplication/:id", dashboardDeleteController.deleteStructuralEnvironmentalLicenseApplication);
//
module.exports = router;
