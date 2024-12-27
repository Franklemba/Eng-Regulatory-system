// dashboardPostController.js

const EngineeringLicense = require("../models/licenseSchema");
const EngineeringProject = require("../models/projectSchema");
const ImportExportSchema = require("../models/importExportSchema");
const AnnualDeclaration = require("../models/annualDeclarationSchema");
const PremiseLeasing = require("../models/premiseSchema");

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
console.log(req.body)
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

const submitProject = async (req, res) => {

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

const submitBusinessClosure = async (req, res) => console.log(req.body);
const submitStructuralEnvironmentalLicense = async (req, res) => console.log(req.body);
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
  submitStructuralEnvironmentalLicense,
  submitOrderForSupply,
  submitAwarenessAdvert,
  submitAssessment,
};
