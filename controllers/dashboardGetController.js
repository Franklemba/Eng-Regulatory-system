// dashboardGetController.js
const EngineeringLicense = require("../models/licenseSchema");
const EngineeringProject = require("../models/projectSchema");
const ProductCertificationSchema = require("../models/productCertificationSchema");
const AnnualDeclaration = require("../models/annualDeclarationSchema");
const PremiseLeasing = require("../models/premiseSchema");
const BusinessClosure = require("../models/businessClosureSchema");
const OrderForSupply = require("../models/orderForSupplySchema");

const StatutoryCompliance = require("../models/statutoryComplianceSchema");
const base64Decode = (data) => {
  return Buffer.from(data, 'base64').toString('utf-8');
};


const getDashboard = async (req, res) => {
  const projects = await EngineeringProject.find()
  // const totalComplianceDoc = await StatutoryCompliance.find()
  const totalComplianceDocs = await StatutoryCompliance.countDocuments();

    res.render("home/dashboard/dashboard", {
      layout: "layouts/dashboardHeader.ejs",
      user: req.user,
      activeProjects:projects,
      totalComplianceDocs
    });
  };
  
  const getNewApplicationPage = async (req, res) => {
    res.render("home/dashboard/newApplication", {
      layout: "layouts/dashboardHeader.ejs",
      user: req.user,
    });
  };


  
  const getNewProjectListingPage = async (req, res) => {
    res.render("home/dashboard/newProject", {
      layout: "layouts/dashboardHeader.ejs",
      user: req.user,
    });
  };
  
  const path = require("path");

  const getSubmittedApplicationPage = async (req, res) => {
      try {
          // Fetch submitted applications from the database and sort them
          const submittedApplications = await EngineeringLicense.find({}).sort({ _id: -1 });
  
          // Process document paths for each application
          const applicationsWithDocuments = submittedApplications.map(application => {
            console.log('doc objectt', application.documents)
              const processedDocuments = application.documents.map(doc => ({
            
                  url:doc, // Assuming `doc` contains the relative path to the file
                  name: doc // Extract the filename from the path
              }));
  
              return {
                  ...application.toObject(), // Convert Mongoose document to plain JS object
                  documents: processedDocuments
              };
          });
  
          // Render the EJS view with the processed applications
          res.render("home/dashboard/submittedApplication", {
              layout: "layouts/dashboardHeader.ejs",
              user: req.user, // Pass the authenticated user data
              submittedApplications: applicationsWithDocuments
          });
      } catch (err) {
          console.error("Error fetching submitted applications:", err.message);
          res.status(500).send("An error occurred while fetching submitted applications.");
      }
  };
  
  const getReviewProgressPage = async (req, res) => {
    res.render("home/dashboard/reviewProgress", {
      layout: "layouts/dashboardHeader.ejs",
      user: req.user,
    });
  };
  
  const getPremiseLeasingPage = async (req, res) => {
    const projects = await EngineeringProject.find({}).sort({ _id: -1 });
    res.render("home/dashboard/premisesLeasing", {
      layout: "layouts/dashboardHeader.ejs",
      user: req.user,
      projects
    });
  };
  
  const getSubmittedLeasingsPage = async (req, res) => {
    const premises = await PremiseLeasing.find({}).sort({ _id: -1 });
    res.render("home/dashboard/submittedLeasingsPage", {
      layout: "layouts/dashboardHeader.ejs",
      user: req.user,
      premises
    });
  };
  
  const getAnnualDeclarationPage = async (req, res) => {
    res.render("home/dashboard/annualDeclaration", {
      layout: "layouts/dashboardHeader.ejs",
      user: req.user,
    });
  };
  
  const getProductCertificationApplicationPage = async (req, res) => {
    res.render("home/dashboard/productCertification", {
      layout: "layouts/dashboardHeader.ejs",
      user: req.user,
    });
  };

  const getProductCertificationApplicationsPage = async (req, res) => {
    const productCertifications = await ProductCertificationSchema.find({}).sort({ _id: -1 });
    res.render("home/dashboard/productCertifications", {
      layout: "layouts/dashboardHeader.ejs",
      user: req.user,
      productCertifications
    });
  };
  
  const getBusinessClosurePage = async (req, res) => {

    const message = req.query.message;

    res.render("home/dashboard/businessClosure", {
      layout: "layouts/dashboardHeader.ejs",
      message: message !=  undefined
          ? `${base64Decode(message)}`
          : null ,
      user: req.user,
    });
  };
  
  const getStructuralEnvironmentalLicensePage = async (req, res) => {
     const message = req.query.message;
     
    res.render("home/dashboard/enviromentalAndStructural", {
      layout: "layouts/dashboardHeader.ejs",
      message: message !=  undefined
            ? `${base64Decode(message)}`
            : null ,
        user: req.user,
    });
  };
  
  const getOrderForSupplyPage = async (req, res) => {
    const message = req.query.message;

    try{

      const orderSupplies = await OrderForSupply.find({}).sort({ _id: -1 });
      res.render("home/dashboard/orderForSupply", {
        layout: "layouts/dashboardHeader.ejs",
        message: message !=  undefined
            ? `${base64Decode(message)}`
            : null ,
        user: req.user,
        orderSupplies 
      });
      
      
    }catch(error){
         res.send(error.message)
    }
    
  };
  


  const getStatutoryCompliance =  async (req, res) => {
    const message = req.query.message;
    
    res.render("home/dashboard/statutoryCompliance", {
      layout: "layouts/dashboardHeader.ejs",
      message: message !=  undefined
            ? `${base64Decode(message)}`
            : null ,
      user: req.user,
    });
  };


  const getStatutoryComplianceStatus =  async (req, res) => {
    // const message = req.query.message;

    const statutoryComplianceDocs = await StatutoryCompliance.find().sort({ _id: -1 })

    
    res.render("home/dashboard/statutoryComplianceStatus", {
      layout: "layouts/dashboardHeader.ejs",
      // message: message !=  undefined
      //       ? `${base64Decode(message)}`
      //       : null ,
      user: req.user,
      statutoryComplianceDocs
    });
  };
  
  const getAssessmentPage = async (req, res) => {
    res.render("home/dashboard/assessment", {
      layout: "layouts/dashboardHeader.ejs",
      user: req.user,
    });
  };

  const getProfileManagement = async (req, res) => {
    res.render("auth/profileManagement", {
      layout: "layouts/dashboardHeader.ejs",
      user: req.user,
    });
  };

  

  const getProjectApplicationProgress = async (req, res) => {
    const projects = await EngineeringProject.find({}).sort({ _id: -1 });
    res.render("home/dashboard/projectApplicationsProgress", {
      layout: "layouts/dashboardHeader.ejs",
      user: req.user,
      projects
    });
  };
  const downloadFile = async (req, res) => {
    
  const filePath = req.params.filename;
  res.download(filePath, (err) => {
      if (err) {
          console.error('Error downloading file:', err);
          res.status(500).send('File download error.');
      }
  
});

  };
  
  module.exports = {
    getDashboard,
    getNewApplicationPage,
    getSubmittedApplicationPage,
    getReviewProgressPage,
    getPremiseLeasingPage,
    getAnnualDeclarationPage,
    getProductCertificationApplicationPage,
    getProductCertificationApplicationsPage,
    getBusinessClosurePage,
    getStructuralEnvironmentalLicensePage,
    getOrderForSupplyPage,
    getStatutoryCompliance,
    getStatutoryComplianceStatus,
    getAssessmentPage,
    downloadFile,
    getNewProjectListingPage,
    getProfileManagement,
    getProjectApplicationProgress,
    getSubmittedLeasingsPage
  };
  