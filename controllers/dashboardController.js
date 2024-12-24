const EngineeringLicense = require("../models/licenceSchema");

// Controller function for handling form submission
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

    console.log(req.files);
    // Ensure supporting documents are uploaded
    // if (!req.files) {
    //   return res.status(400).send("Please upload supporting documents.");
    // }

    const documents = req.files?.documents.map(file => file.path);

    // Create a new record
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

    // Save to database
    await newLicense.save();
    res.redirect("/dashboard/newApplication");
  } catch (error) {
    console.error("Error saving engineering license application:", error);
    res.status(500).send("An error occurred while processing your application.");
  }
};


const submitProject = async (req, res) => {
 console.log(req.body);	
}


const submitPremiseLeasing = async (req, res) => {
    console.log(req.body);	
   }

   const submitAnnualDeclaration = async (req, res) => {
    console.log(req.body);	
   }

   const submitExportImportApplication = async (req, res) => {
    console.log(req.body);	
   }

   const submitBusinessClosure = async (req, res) => {
    console.log(req.body);	
   }

   const submitStructuralEnvironmentalLicence = async (req, res) => {
    console.log(req.body);	
   }

   const submitOrderForSupply = async (req, res) => {
    console.log(req.body);	
   }


   const submitAwarenessAdvert = async (req, res) => {
    console.log(req.body);	
   }

   const submitAssessment = async (req, res) => {
    console.log(req.body);	
   }
module.exports = {submitApplication,submitProject,submitPremiseLeasing,submitAnnualDeclaration,submitExportImportApplication,submitBusinessClosure,submitStructuralEnvironmentalLicence,submitOrderForSupply,submitAwarenessAdvert, submitAssessment};	