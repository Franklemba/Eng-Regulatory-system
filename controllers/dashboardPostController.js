// dashboardPostController.js



const EngineeringLicense = require("../models/licenseSchema");
const EngineeringProject = require("../models/projectSchema");
const ImportExportSchema = require("../models/importExportSchema");
const AnnualDeclaration = require("../models/annualDeclarationSchema");
const PremiseLeasing = require("../models/premiseSchema");
const BusinessClosure = require("../models/businessClosureSchema");
const OrderForSupply = require("../models/orderForSupplySchema");
const AwarenessAdvert = require("../models/awarenessAdvertSchema");
const StructuralEnvironmentalLicense = require("../models/structuralEnvironmentalLicenceSchema");




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
    const documents = req.files.documents?.map(file => file.path) || [];
    console.log(documents)

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
    res.redirect("/dashboard/submittedApplication");
  } catch (error) {
    console.error("Error saving engineering license application:", error);
    res.status(500).send("An error occurred while processing your application.");
  }
};

const submitProject = async (req, res) => {
  try {
    const {
      title,
      type,
      budget,
      duration,
      status,
      objectives,
      teamMembers,
      permits,
      locations
    } = req.body;
console.log(req.body)
    // Create a new project instance with the data from the request
    const newProject = new EngineeringProject({
      title:'',
      type:'',
      budget:'',
      duration:'',
      status:'',	
      objectives:'',
      teamMembers:'',
      permits:'',	
      locations, // Assuming locations are sent as a stringified array
    });

    // Handle file uploads if there are any
    const documents = req.files?.map(file => file.path) || [];
    newProject.files = documents;

    // Save the new project to the database
    await newProject.save();

    // Redirect to a new page after the project is saved
    res.redirect("/dashboard/newApplication");
  } catch (error) {
    console.error("Error saving project application:", error);
    res.status(500).send("An error occurred while processing your application.");
  }
};



const submitPremiseLeasing = async (req, res) => {

  try {
    const {

    } = req.body;

    const newPremiseLeasing = new PremiseLeasing({

    });

    const documents = req.files?.map(file => file.path) || [];
    await newPremiseLeasing.save();
    res.redirect("/dashboard/newApplication");
  }
  catch (error) {
    console.error("Error saving project application:", error);
    res.status(500).send("An error occurred while processing your application.");
  }

};

const submitAnnualDeclaration= async (req, res) => {

  try {
    const {

    } = req.body;

    const newAnnualDeclaration = new AnnualDeclaration({

    });

    const documents = req.files?.map(file => file.path) || [];
    await newAnnualDeclaration.save();
    res.redirect("/dashboard/newApplication");
  }
  catch (error) {
    console.error("Error annual declaration application:", error);
    res.status(500).send("An error occurred while processing your application.");
  }

};

const submitExportImportApplication = async (req, res) => {

  try {
    const {

    } = req.body;

    const newExportImportApplication = new ImportExportSchema({

    });

    const documents = req.files?.map(file => file.path) || [];
    await newExportImportApplication.save();
    res.redirect("/dashboard/newApplication");
  }
  catch (error) {
    console.error("Error saving import export application:", error);
    res.status(500).send("An error occurred while processing your application.");
  }

};


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
const submitStructuralEnvironmentalLicense = async (req, res) => {
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
const structuralIntegrityEvaluationReport = req.files.structuralIntegrityEvaluationReport[0].path;
const environmentImpactMitigationPlan = req.files.environmentImpactMitigationPlan[0].path;
const supportingDocument = req.files.supportingDocument[0].path;

try{
  
  const structuralEnvironmentalLicence = new StructuralEnvironmentalLicense({
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
const submitAssessment = async (req, res) => console.log(req.body);



module.exports = {
  submitApplication,
  submitProject,
  submitPremiseLeasing,
  submitAnnualDeclaration,
  submitExportImportApplication,


  submitBusinessClosure,
  submitStructuralEnvironmentalLicense,
  submitOrderForSupply,
  submitAwarenessAdvert,
  submitAssessment,
};
