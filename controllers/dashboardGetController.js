// dashboardGetController.js

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
    res.render("home/dashboard/businessClosure", {
      layout: "layouts/dashboardHeader.ejs",
      user: req.user,
    });
  };
  
  const getStructuralEnvironmentalLicencePage = async (req, res) => {
    res.render("home/dashboard/structuralEnvironmentalLicence", {
      layout: "layouts/dashboardHeader.ejs",
      user: req.user,
    });
  };
  
  const getOrderForSupplyPage = async (req, res) => {
    res.render("home/dashboard/orderForSupply", {
      layout: "layouts/dashboardHeader.ejs",
      user: req.user,
    });
  };
  
  const getAwarenessAdvertPage = async (req, res) => {
    res.render("home/dashboard/awarenessAdvert", {
      layout: "layouts/dashboardHeader.ejs",
      user: req.user,
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
    getAssessmentPage,
  };
  