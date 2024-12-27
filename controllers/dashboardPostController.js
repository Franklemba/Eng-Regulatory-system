// dashboardPostController.js



const EngineeringLicense = require("../models/licenceSchema");
const EngineeringProject = require("../models/projectSchema");
const ImportExportSchema = require("../models/importExportSchema");
const AnnualDeclaration = require("../models/annualDeclarationSchema");
const PremiseLeasing = require("../models/licenceSchema");
const BusinessClosure = require("../models/businessClosureSchema");
const OrderForSupply = require("../models/orderForSupplySchema");
const AwarenessAdvert = require("../models/awarenessAdvertSchema");
const StructuralEnvironmentalLicence = require("../models/structuralEnvironmentalLicenceSchema");
const StatutoryCompliance = require("../models/statutoryComplianceSchema");


const base64Encode = (data) => {
  return Buffer.from(data).toString('base64');
};


// Charles's routes
const submitApplication = async (req, res) => {
  try {
    const {
      applicantName,
      email,
      phone,
      country,
      city,
      address,
      companyName,
      registrationNumber,
      engineeringFields,
      licenseType,
      description,
    } = req.body;

    const documents = req.files?.map(file => file.path) || [];

    const newLicense = new EngineeringLicense({
      applicantName,
      email,
      phone,
      country,
      city,
      address,
      companyName,
      registrationNumber,
      engineeringFields,
      licenseType,
      documents,
      description,
    });

    await newLicense.save();
    res.redirect("/dashboard/newApplication");
  } catch (error) {
    console.error("Error saving engineering license application:", error);
    res.status(500).send("An error occurred while processing your application.");
  }
};

const submitProject = async (req, res) => {console.log(req.body)

  try {
    const {

    } = req.body;

    const newProject = new EngineeringProject({

    });

    const documents = req.files?.map(file => file.path) || [];
    await newProject.save();
    res.redirect("/dashboard/newApplication");
  }
  catch (error) {
    console.error("Error saving project application:", error);
    res.status(500).send("An error occurred while processing your application.");
  }

};
const submitPremiseLeasing = async (req, res) => console.log(req.body);
const submitAnnualDeclaration = async (req, res) => console.log(req.body);
const submitExportImportApplication = async (req, res) => console.log(req.body);

//Franks routes
  // ### Submit business closure route
const submitBusinessClosure =  async (req, res, next) => {

  const {
      businessName,
      licenseID,
      reasonForClosure,
      closureDate
    } = req.body;

  const uploadedDoc = req.file.path;

  try{
    
    const businessClosure = new BusinessClosure({
      businessName,
      licenseID,
      reasonForClosure,
      closureDate,
      finalFinancialStatement : uploadedDoc
    })

    await businessClosure.save();
    successMessage = ` ${businessName} business closure uploaded successfully`;

    res.redirect(`/dashboard/businessClosure?message=${encodeURIComponent(base64Encode(successMessage))}`);

  }catch (error) {
    console.error(`Error uploading business closure : ${error.message}`);
    res.send("Error uploading business closure");
  }

 
};

// ## strauctural environment licence over here
const submitStructuralEnvironmentalLicence = async (req, res) => {
  const {
    projectName,
    projectID,
    isEIArequired,
    localEcosystemImpactDescription,
    structuralSafetyStandards,
    structureType,
    environmentalAssessDetails,
    structuralSafetyDetails,
    emergencyResponsePlan
  } = req.body;

  if(!req.files){
    return res.status(404).send('no files uploaded');
  }

// const uploadedDoc = req.file.path;
console.log(req.files);
const structuralIntegrityEvaluationReport = req.files.structuralIntegrityEvaluationReport?.[0]?.path.replace(/.*public[\\/]/, '');
const environmentImpactMitigationPlan = req.files.environmentImpactMitigationPlan?.[0]?.path.replace(/.*public[\\/]/, '');
const supportingDocument = req.files.supportingDocument?.[0]?.path.replace(/.*public[\\/]/, '');

try{
  
  const structuralEnvironmentalLicence = new StructuralEnvironmentalLicence({
    projectName,
    projectID,
    isEIArequired,
    localEcosystemImpactDescription,
    structuralSafetyStandards,
    structureType,
    structuralIntegrityEvaluationReport: structuralIntegrityEvaluationReport,
    environmentImpactMitigationPlan: environmentImpactMitigationPlan,
    environmentalAssessDetails,
    structuralSafetyDetails,
    emergencyResponsePlan,
    supportingDocument: supportingDocument 
  })

  await structuralEnvironmentalLicence.save();
  console.log(structuralEnvironmentalLicence)
  successMessage = ` ${projectName} uploaded successfully`;

  res.redirect(`/dashboard/structuralEnvironmentalLicence?message=${encodeURIComponent(base64Encode(successMessage))}`);

}catch (error) {
  console.error(`Error uploading environment structural what what error : ${error.message}`);
  res.send("Error uploading environment structural what what error");
}
};

// ##Order supply over here
const submitOrderForSupply = async (req, res) => {
    
  const {
    supplierName,
  contactPerson,
  contactNumber,
  expectedDeliveryDate,
  priotyLevel,
  orderDetails
  } = req.body;

const uploadedDoc = req.file.path;

try{
  
  const onwardsrderForSupply = new OrderForSupply({
    supplierName,
  contactPerson,
  contactNumber,
  expectedDeliveryDate,
  priotyLevel,
  orderDetails,
  supportingDocument:uploadedDoc
  })

  await onwardsrderForSupply.save();
  console.log(onwardsrderForSupply)
  successMessage = `Order supply named ${supplierName} uploaded successfully`;

  res.redirect(`/dashboard/orderForSupply?message=${encodeURIComponent(base64Encode(successMessage))}`);

}catch (error) {
  console.error(`Error uploading order supply : ${error.message}`);
  res.send("Error uploading order supply");
}


};
const submitAwarenessAdvert = async (req, res) => {
        
    const {
      advertTitle,
      description,
      startDate,
      endDate,
        targetAudience,
    } = req.body;

  const uploadedDoc = req.file.path;

  try{
    
    const awarenessAdvert = new AwarenessAdvert({
      advertTitle,
      description,
      startDate,
      endDate,
        targetAudience,
      advertMedia:uploadedDoc
    })

    await awarenessAdvert.save();
    console.log(awarenessAdvert)
    successMessage = `Awareness advert with title ${advertTitle} uploaded successfully`;

    res.redirect(`/dashboard/awarenessAdvert?message=${encodeURIComponent(base64Encode(successMessage))}`);

  }catch (error) {
    console.error(`Error uploading awareness advert media : ${error.message}`);
    res.send("Error uploading awareness advert media");
  }

};

// ####statutory compliance documents route
const statutoryCompliance = async (req, res) => {
  const user = req.user;
  if(!req.files){
    return res.status(404).send('no files uploaded');
  }

// const uploadedDoc = req.file.path;
console.log(req.email)
console.log(req.files);
const zppaDoc = req.files.zppaDoc?.[0]?.path.replace(/.*public[\\/]/, '');
const pacraDoc = req.files.pacraDoc?.[0]?.path.replace(/.*public[\\/]/, '');
const workcompDoc = req.files.workcompDoc?.[0]?.path.replace(/.*public[\\/]/, '');
const nhimaDoc = req.files.nhimaDoc?.[0]?.path.replace(/.*public[\\/]/, '');
const erbDoc = req.files.erbDoc?.[0]?.path.replace(/.*public[\\/]/, '');


try{
  
  const statutoryCompliance = new StatutoryCompliance({
    userEmail: user.email,
    zppaDoc,
    pacraDoc,
    workcompDoc,
    nhimaDoc,
    erbDoc
  })

  await statutoryCompliance.save();
  console.log(statutoryCompliance)
  successMessage = ` Statutory compliance documents uploaded successfully`;

  res.redirect(`/dashboard/newCompliance?message=${encodeURIComponent(base64Encode(successMessage))}`);

}catch (error) {
  console.error(`Error uploading statutory documents : ${error.message}`);
  res.send("Error uploading statutory documents");
}
};

const submitAssessment = async (req, res) => console.log(req.body);



module.exports = {
  submitApplication,
  submitProject,
  submitPremiseLeasing,
  submitAnnualDeclaration,
  submitExportImportApplication,


  submitBusinessClosure,
  submitStructuralEnvironmentalLicence,
  submitOrderForSupply,
  submitAwarenessAdvert,
  statutoryCompliance,
  submitAssessment,
};
