const express = require("express");
const router = express.Router();
const passport = require('passport')


const authControllerUtilities = require('../controllers/auth_utilitiesController');
const authControllerSignUP = require('../controllers/sign_upController');


router.get("/", (req, res) => {

   const layout = "layouts/non_headerLayout"
  
    res.render("auth/login", {
      incorrectCredentials : true,
      errorMessage: '',
      layout
    });
  
  });


router.get("/login", (req,res) => {
   res.redirect('/auth');
})

router.get("/incorrect_credentials", (req, res)=>{
  const layout = "layouts/non_headerLayout"

    res.render("auth/login", {
      incorrectCredentials: true,
      errorMessage: req.flash("error")[0],
      layout
    });
  });

router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/auth/incorrect_credentials",
      failureFlash: true,
    })(req, res, next);
  });

  
    
router.get("/register", authControllerSignUP.getSignUp);

router.post("/register", authControllerSignUP.postSignUp);
router.post("/updateProfile", authControllerUtilities.updateProfile);

router.post("/verify-otp/:userId", authControllerSignUP.verifyOTP);

router.post("/resend-otp/:userId", authControllerSignUP.resendOTP);


// Profile settings route
router.get("/profile-setting", authControllerUtilities.profileSetting);
// Change password route
router.get("/change-password", authControllerUtilities.changePassword);

router.post("/change-password", authControllerUtilities.postChangePassword);

// Two-step verification route
router.get("/two-step", authControllerUtilities.twoStep);

// Logout route
router.get("/logout", authControllerUtilities.logout);



module.exports = router;




