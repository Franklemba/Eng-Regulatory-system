

const express = require("express");
const router = express.Router();
const fs = require('fs');


router.get("/", async (req,res) => {

    res.render("home/dashboard",{
     layout:"layouts/dashboardHeader.ejs",
     user:req.user
    })
      
  })


  
module.exports = router;