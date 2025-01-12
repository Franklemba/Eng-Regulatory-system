const express = require("express");
const router = express.Router();
// const upload = require("../utilities/awsConfig");
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const dashboardPostController = require("../controllers/dashboardPostController");
const upload = require("../utilities/awsConfig");

const app = express();
app.use(express.urlencoded({ extended: true }));




// const publicUploadsDir = path.join(__dirname, '../public/uploads');
// if (!fs.existsSync(publicUploadsDir)) {
//   fs.mkdirSync(publicUploadsDir, { recursive: true });
// }


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Define upload directory
//     cb(null, publicUploadsDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now()+ "-" +  file.originalname );
//   }
// });

// // Set up multer with the custom storage
// const upload = multer({ storage: storage });
  
  

router.post("/newApplication", 
  upload.fields([
    { name: 'designCalculations', maxCount: 1 },
    { name: 'engineeringDrawings', maxCount: 10 },
    { name: 'feasibilityStudy', maxCount: 1 },
    { name: 'boqDocument', maxCount: 1 },
    { name: 'qaqcPlan', maxCount: 1 }
  ]),
dashboardPostController.submitApplication);

router.post("/uploadApplicationDoc/:uploadSingleDoc",upload.single('uploadSingleDoc'),
dashboardPostController.submitSingleDocForApplication);



// router.post("/newApplication",dashboardPostController.submitApplication);
router.post("/newProject", upload.fields([
  { name: 'CFEdoc', maxCount: 1 },
  { name: 'pastExperienceRefDoc', maxCount: 1 },
  { name: 'CFCdoc', maxCount: 1 },
  { name: 'taxComplianceDoc', maxCount: 1 },
  { name: 'proofOfAdherenceDoc', maxCount: 1 },
  { name: 'detailedProjectDoc', maxCount: 1 },
  { name: 'productSummaryDoc', maxCount: 1 },
  { name: 'techSpecOverviewDoc', maxCount: 1 },
  { name: 'commercialInvoice', maxCount: 1 },
  { name: 'invoiceInstrumentDoc', maxCount: 1 },
  { name: 'noticeOfAwardDoc', maxCount: 1 }
]),dashboardPostController.submitProject);

router.post("/uploadProjectDoc/:uploadSingleDoc", upload.single('uploadSingleDoc'),dashboardPostController.submitSingleDocForProject);


router.post("/newPremiseLeasing",  upload.fields([
  { name: 'leaseAgreement', maxCount: 1 },
  { name: 'zoningApproval', maxCount: 1 },
  { name: 'environmentalClearance', maxCount: 1 },
  { name: 'buildingSafetyCert', maxCount: 1 },
  { name: 'otherDocs', maxCount: 10 }
]),dashboardPostController.submitPremiseLeasing);


router.post("/newAnnualDeclaration", dashboardPostController.submitAnnualDeclaration);
router.post("/newLicenseAndCertification",  upload.single('licenseAndCertificationDoc'),dashboardPostController.submitLicenseAndCertification
  
);


router.post("/newProductCertification", upload.fields([
  { name: 'productDatasheet', maxCount: 1 },
  { name: 'standardCertifications', maxCount: 1 },
  { name: 'manufacturerAuthorization', maxCount: 1 },
  { name: 'billOfQuantities', maxCount: 1 },
]), dashboardPostController.submitProductCertificationApplication);

router.post("/uploadProductCertificationDoc/:uploadSingleDoc",upload.single('uploadSingleDoc'),
dashboardPostController.submitSingleDocForProductCertification);

router.post('/businessClosure', upload.single('finalFinancialStatement'), (req, res, next) => {
  console.log('File Received:', req.file);
  next();
}, dashboardPostController.submitBusinessClosure);

router.post("/newEnvironmentAndStructuralLicence", 
  upload.fields([
       { name: 'structuralIntegrityEvaluationReport', maxCount: 1 },
      { name: 'environmentImpactMitigationPlan', maxCount: 1 }, 
      {name: 'supportingDocument', maxCount: 1}]), dashboardPostController.submitStructuralEnvironmentalLicense);

      router.post("/uploadEnvStructuralDoc/:uploadSingleDoc",upload.single('uploadSingleDoc'),
dashboardPostController.submitSingleDocForEnvStructural);
// router.post("/orderForSupply", upload.single('supportingDocument'), dashboardPostController.submitOrderForSupply);
// router.post("/newAwarenessAdvert",  upload.single('advertMedia'), dashboardPostController.submitAwarenessAdvert);
router.post("/newAssessment", dashboardPostController.submitAssessment);
router.post("/statutoryCompliance", upload.fields([
  { name: 'zppaDocument', maxCount: 1 },
  { name: 'pacraDocument', maxCount: 1 },
  { name: 'taxDocument', maxCount: 1 },
  { name: 'workersCompensation', maxCount: 1 },
  { name: 'energyRegulation', maxCount: 1 },
  { name: 'nhimaDocument', maxCount: 1 },
  { name: 'otherDocuments', maxCount: 5 } // Allow multiple files
]), dashboardPostController.statutoryCompliance);


router.post("/uploadStatutoryComplianceDoc/:uploadSingleDoc",upload.single('uploadSingleDoc'),
dashboardPostController.submitSingleDocForCompliance);

module.exports = router;
