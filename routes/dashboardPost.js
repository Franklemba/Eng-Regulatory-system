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
  
  

router.post("/newApplication", upload.fields([{ name: 'supportingDocument', maxCount: 1 }, { name: 'documents', maxCount: 1 }]), dashboardPostController.submitApplication);
// router.post("/newApplication",dashboardPostController.submitApplication);
router.post("/newProject", upload.fields([{ name: 'documents', maxCount: 4 }]),dashboardPostController.submitProject);

router.post("/newPremiseLeasing",  upload.fields([
  { name: 'leaseAgreement', maxCount: 1 },
  { name: 'zoningApproval', maxCount: 1 },
  { name: 'environmentalClearance', maxCount: 1 },
  { name: 'buildingSafetyCert', maxCount: 1 },
  { name: 'otherDocs', maxCount: 10 }
]),dashboardPostController.submitPremiseLeasing);


router.post("/newAnnualDeclaration", dashboardPostController.submitAnnualDeclaration);
router.post("/newProductCertification", upload.fields([
  { name: 'productDatasheet', maxCount: 1 },
  { name: 'standardCertifications', maxCount: 1 },
  { name: 'manufacturerAuthorization', maxCount: 1 }
]), dashboardPostController.submitProductCertificationApplication);

router.post('/businessClosure', upload.single('finalFinancialStatement'), (req, res, next) => {
  console.log('File Received:', req.file);
  next();
}, dashboardPostController.submitBusinessClosure);

router.post("/newEnvironmentAndStructuralLicence", 
  upload.fields([
       { name: 'structuralIntegrityEvaluationReport', maxCount: 1 },
      { name: 'environmentImpactMitigationPlan', maxCount: 1 }, 
      {name: 'supportingDocument', maxCount: 1}]), dashboardPostController.submitStructuralEnvironmentalLicense);
// router.post("/orderForSupply", upload.single('supportingDocument'), dashboardPostController.submitOrderForSupply);
// router.post("/newAwarenessAdvert",  upload.single('advertMedia'), dashboardPostController.submitAwarenessAdvert);
router.post("/newAssessment", dashboardPostController.submitAssessment);
router.post("/statutoryCompliance", upload.fields([
           { name: 'zppaDoc', maxCount: 1 },
           { name: 'pacraDoc', maxCount: 1 },
           {name: 'workcompDoc', maxCount: 1},
           {name: 'nhimaDoc', maxCount: 1}, 
           {name: 'erbDoc', maxCount: 1}, 
           {name: 'others', maxCount: 1}]), dashboardPostController.statutoryCompliance);
                                  

module.exports = router;
