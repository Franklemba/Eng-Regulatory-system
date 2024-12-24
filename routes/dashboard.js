const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer =  require('multer')
const dashboardController = require("../controllers/dashboardController");

// const upload = require('../utilities/awsConfig');

router.get("/newApplication", async (req, res) => {
  res.render("home/dashboard/newApplication", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});

router.post("/newApplication", 
  // upload.array('documents'),
  dashboardController.submitApplication
);


router.get("/submittedApplication", async (req, res) => {
  res.render("home/dashboard/submittedApplication", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});

router.get("/reviewProgress", async (req, res) => {
  res.render("home/dashboard/reviewProgress", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});

router.get("/permits", async (req, res) => {
  res.render("home/dashboard/permits", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});

router.get("/newProject", async (req, res) => {
  res.render("home/dashboard/newProject", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});


router.get("/newProjectListing", async (req, res) => {
  res.render("home/dashboard/newProject", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});

router.get("/premisesLeasing", async (req, res) => {
  res.render("home/dashboard/premisesLeasing", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});

router.get("/premisesRegistration", async (req, res) => {
  res.render("home/dashboard/premisesRegistration", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});

router.get("/declarationOfReturns", async (req, res) => {
  res.render("home/dashboard/declarationOfAnnualReturns", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});

router.get("/importExportApplication", async (req, res) => {
  res.render("home/dashboard/importExportApplication", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});

router.get("/importExportApplicationStatus", async (req, res) => {
  res.render("home/dashboard/importExportApplicationStatus", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});


router.get("/newLicence", async (req, res) => {
  res.render("home/dashboard/newLicence", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});



router.get("/licenceRenewal", async (req, res) => {
  res.render("home/dashboard/licenceRenewal", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});



router.get("/ammendments", async (req, res) => {
  res.render("home/dashboard/ammendments", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});



router.get("/businessClosure", async (req, res) => {
  res.render("home/dashboard/businessClosure", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});




router.get("/environmentalAndStructuralLicence", async (req, res) => {
  res.render("home/dashboard/enviromentalAndStructural", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});


router.get("/environmentalAndStructuralLicenceStatus", async (req, res) => {
  res.render("home/dashboard/enviromentalAndStructuralStatus", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});



router.get("/orderForSupply", async (req, res) => {
  res.render("home/dashboard/orderForSupply", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});



router.get("/assessments", async (req, res) => {
  res.render("home/dashboard/assessments", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});



router.get("/awarenessAdvert", async (req, res) => {
  res.render("home/dashboard/awarenessAdvert", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});



router.get("/archivedApplication", async (req, res) => {
  res.render("home/dashboard/archivedApplication", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});



router.get("/disposeApplication", async (req, res) => {
  res.render("home/dashboard/disposeApplication", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});

router.get("/profileManagement", async (req, res) => {
  res.render("home/dashboard/profileManagement", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});

module.exports = router;
