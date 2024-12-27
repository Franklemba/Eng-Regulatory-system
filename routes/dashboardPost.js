const express = require("express");
const router = express.Router();
// const upload = require("../utilities/awsConfig");
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const dashboardPostController = require("../controllers/dashboardPostController");

const app = express();
app.use(express.urlencoded({ extended: true }));

const publicUploadsDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(publicUploadsDir)) {
  fs.mkdirSync(publicUploadsDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define upload directory
    cb(null, publicUploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now()+ "-" +  file.originalname );
  }
});

// Set up multer with the custom storage
const upload = multer({ storage: storage });
  
  


router.post("/newApplication", upload.fields([{ name: 'supportingDocument', maxCount: 1 }, { name: 'documents', maxCount: 1 }]), dashboardPostController.submitApplication);
// router.post("/newApplication",dashboardPostController.submitApplication);
router.post("/newProject", dashboardPostController.submitProject);
router.post("/newPremiseLeasing", dashboardPostController.submitPremiseLeasing);
router.post("/newAnnualDeclaration", dashboardPostController.submitAnnualDeclaration);
router.post("/newExportImportApplication", dashboardPostController.submitExportImportApplication);

router.post("/businessClosure",  upload.single('finalFinancialStatement'), dashboardPostController.submitBusinessClosure);
router.post("/newEnvironmentAndStructuralLicence", upload.fields([{ name: 'structuralIntegrityEvaluationReport', maxCount: 1 }, { name: 'environmentImpactMitigationPlan', maxCount: 1 }, {name: 'supportingDocument', maxCount: 1}]),dashboardPostController.submitStructuralEnvironmentalLicense);
router.post("/orderForSupply", upload.single('supportingDocument'), dashboardPostController.submitOrderForSupply);
router.post("/newAwarenessAdvert",  upload.single('advertMedia'), dashboardPostController.submitAwarenessAdvert);
router.post("/newAssessment", dashboardPostController.submitAssessment);

module.exports = router;
