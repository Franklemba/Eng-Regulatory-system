// dashboardGetController.js
const OrderForSupply = require("../models/orderForSupplySchema");
const AwarenessAdvert = require("../models/awarenessAdvertSchema");
const StatutoryCompliance = require("../models/statutoryComplianceSchema");
const base64Decode = (data) => {
  return Buffer.from(data, 'base64').toString('utf-8');
};


const getDashboard = async (req, res) => {
    res.render("home/dashboard/dashboard", {
      layout: "layouts/dashboardHeader.ejs",
      user: req.user,
    });
  };
  
  const getNewApplicationPage = async (req, res) => {
    res.render("home/dashboard/newApplication", {
      layout: "layouts/dashboardHeader.ejs",
      user: req.user,
    });
  };
  
  const getSubmittedApplicationPage = async (req, res) => {
    res.render("home/dashboard/submittedApplication", {
      layout: "layouts/dashboardHeader.ejs",
      user: req.user,
    });
  };
  
  const getReviewProgressPage = async (req, res) => {
    res.render("home/dashboard/reviewProgress", {
      layout: "layouts/dashboardHeader.ejs",
      user: req.user,
    });
  };
  
  const getPremiseLeasingPage = async (req, res) => {
    res.render("home/dashboard/premiseLeasing", {
      layout: "layouts/dashboardHeader.ejs",
      user: req.user,
    });
  };
  
  const getAnnualDeclarationPage = async (req, res) => {
    res.render("home/dashboard/annualDeclaration", {
      layout: "layouts/dashboardHeader.ejs",
      user: req.user,
    });
  };
  
  const getExportImportApplicationPage = async (req, res) => {
    res.render("home/dashboard/importExportApplication", {
      layout: "layouts/dashboardHeader.ejs",
      user: req.user,
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
  
  const getStructuralEnvironmentalLicencePage = async (req, res) => {
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
  
  const getAwarenessAdvertPage = async (req, res) => {
    const message = req.query.message;
    const awarenessAdvert = await AwarenessAdvert.find({}).sort({ _id: -1 });
    try{
      res.render("home/dashboard/awarenessAdvert", {
        layout: "layouts/dashboardHeader.ejs",
        message: message !=  undefined
            ? `${base64Decode(message)}`
            : null ,
        user: req.user,
        awarenessAdvert
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

    const statutoryComplianceDocs = await StatutoryCompliance.findOne().sort({ _id: -1 })

    
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
  
  module.exports = {
    getDashboard,
    getNewApplicationPage,
    getSubmittedApplicationPage,
    getReviewProgressPage,
    getPremiseLeasingPage,
    getAnnualDeclarationPage,
    getExportImportApplicationPage,
    getBusinessClosurePage,
    getStructuralEnvironmentalLicencePage,
    getOrderForSupplyPage,
    getAwarenessAdvertPage,
    getStatutoryCompliance,
    getStatutoryComplianceStatus,
    getAssessmentPage,

  };
  