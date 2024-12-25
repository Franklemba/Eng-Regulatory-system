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