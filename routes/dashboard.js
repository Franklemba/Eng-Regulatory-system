const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer =  require('multer')
const dashboardController = require("../controllers/dashboardController");

// const upload = require('../utilities/awsConfig');

<<<<<<< HEAD
router.get("/", async (req, res) => {
  res.render("home/dashboard/dashboard", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});

=======
>>>>>>> 025091a4a07d799551cb1e8761ce7e37abc83b18
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

<<<<<<< HEAD
router.post("/newProject", 
  // upload.array('documents'),
  dashboardController.submitProject
);

=======
>>>>>>> 025091a4a07d799551cb1e8761ce7e37abc83b18

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

<<<<<<< HEAD
router.post("/newPremiseLeasing", 
  // upload.array('documents'),
  dashboardController.submitPremiseLeasing
);


=======
>>>>>>> 025091a4a07d799551cb1e8761ce7e37abc83b18
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

<<<<<<< HEAD
router.post("/newAnnualDeclaration", 
  // upload.array('documents'),
  dashboardController.submitAnnualDeclaration
);


=======
>>>>>>> 025091a4a07d799551cb1e8761ce7e37abc83b18
router.get("/importExportApplication", async (req, res) => {
  res.render("home/dashboard/importExportApplication", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});

<<<<<<< HEAD
router.post("/newExportImportApplication", 
  // upload.array('documents'),
  dashboardController.submitExportImportApplication
);


=======
>>>>>>> 025091a4a07d799551cb1e8761ce7e37abc83b18
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

<<<<<<< HEAD
router.post("/businessClosure", 
  // upload.array('documents'),
  dashboardController.submitBusinessClosure
);
=======
>>>>>>> 025091a4a07d799551cb1e8761ce7e37abc83b18



router.get("/environmentalAndStructuralLicence", async (req, res) => {
  res.render("home/dashboard/enviromentalAndStructural", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});

<<<<<<< HEAD
router.post("/newEnvironmentAndStructuralLicence", 
  // upload.array('documents'),
  dashboardController.submitStructuralEnvironmentalLicence
);

=======
>>>>>>> 025091a4a07d799551cb1e8761ce7e37abc83b18

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

<<<<<<< HEAD
router.post("/orderForSupply", 
  // upload.array('documents'),
  dashboardController.submitOrderForSupply
);
=======
>>>>>>> 025091a4a07d799551cb1e8761ce7e37abc83b18


router.get("/assessments", async (req, res) => {
  res.render("home/dashboard/assessments", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});

<<<<<<< HEAD
router.post("/newAssessment", 
  // upload.array('documents'),
  dashboardController.submitAssessment
);
=======
>>>>>>> 025091a4a07d799551cb1e8761ce7e37abc83b18


router.get("/awarenessAdvert", async (req, res) => {
  res.render("home/dashboard/awarenessAdvert", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});

<<<<<<< HEAD
router.post("/newAwarenessAdvert", 
  // upload.array('documents'),
  dashboardController.submitAwarenessAdvert
);

=======
>>>>>>> 025091a4a07d799551cb1e8761ce7e37abc83b18


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

<<<<<<< HEAD


=======
>>>>>>> 025091a4a07d799551cb1e8761ce7e37abc83b18
router.get("/profileManagement", async (req, res) => {
  res.render("home/dashboard/profileManagement", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});

<<<<<<< HEAD




router.get("/newCompliance", async (req, res) => {
  res.render("home/dashboard/newCompliance", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});

router.post("/newCompliance", 
  // upload.array('documents'),
  dashboardController.submitAwarenessAdvert
);

router.get("/reviewCompliance", async (req, res) => {
  res.render("home/dashboard/reviewCompliance", {
    layout: "layouts/dashboardHeader.ejs",
    user: req.user,
  });
});


=======
>>>>>>> 025091a4a07d799551cb1e8761ce7e37abc83b18
module.exports = router;
