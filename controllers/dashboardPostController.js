// dashboardPostController.js

const EngineeringLicense = require("../models/licenceSchema");
const EngineeringProject = require("../models/projectSchema");
const ImportExportSchema = require("../models/importExportSchema");
const AnnualDeclaration = require("../models/annualDeclarationSchema");
const PremiseLeasing = require("../models/licenceSchema/premiseSchema");

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

const submitBusinessClosure = async (req, res) => console.log(req.body);
const submitStructuralEnvironmentalLicence = async (req, res) => console.log(req.body);
const submitOrderForSupply = async (req, res) => console.log(req.body);
const submitAwarenessAdvert = async (req, res) => console.log(req.body);
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
  submitAssessment,
};
