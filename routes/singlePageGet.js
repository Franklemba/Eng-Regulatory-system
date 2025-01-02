const express = require("express");
const router = express.Router();
const singlePageGetController = require("../controllers/singlePageGetController");


router.get("/viewApplication/:id", singlePageGetController.viewApplicationPage);
router.get("/viewProductCertification/:id", singlePageGetController.viewProductCertificationPage);
router.get("/viewEnvironmentalStructural/:id", singlePageGetController.viewEnvironmentalStructuralPage);	

module.exports = router;
