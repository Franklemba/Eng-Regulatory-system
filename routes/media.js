const express = require("express");
const router = express.Router();
const fs = require('fs');




router.get("/careers", async (req,res) => {

  res.render("newsCenterPages/careers",{
   
  })
    
})


router.get("/news", async (req,res) => {

  res.render("newsCenterPages/news",{
   
  })
    
})


router.get("/publications", async (req,res) => {

  res.render("newsCenterPages/publications",{
   
  })
    
})


router.get("/tenders", async (req,res) => {

  res.render("newsCenterPages/tenders",{
   
  })
    
})

router.get("/press-releases", async (req,res) => {

    res.render("newsCenterPages/press-releases",{
     
    })
      
  })


module.exports = router;