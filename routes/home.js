const express = require("express");
const router = express.Router();
const fs = require('fs');

const User = require("../models/userSchema");




router.get("/", async (req,res) => {

  res.render("home/home",{
   
  })

deleteAllUsers();

    
})





router.get("/legislation", async (req,res) => {

  res.render("aboutUsPages/legislation",{
   
  })
    
})


router.get("/overview", async (req,res) => {

  res.render("aboutUsPages/overview",{
   
  })
    
})


router.get("/functions", async (req,res) => {

  res.render("aboutUsPages/functions",{
   
  })
    
})

router.get("/e-services-portal", async (req,res) => {

  res.render("home/e-services-portal",{
   
  })
    
})

router.get("/fees", async (req,res) => {

  res.render("home/fees",{
   
  })
    
})

router.get("/forms", async (req,res) => {

  res.render("home/forms",{
   
  })
    
})

router.get("/guildelines", async (req,res) => {

  res.render("home/guildelines",{
   
  })
    
})

router.get("/registers", async (req,res) => {

  res.render("home/registers",{
   
  })
    
})

router.get("/contact-us", async (req,res) => {

  res.render("home/contact-us",{
   
  })
    
})







module.exports = router;