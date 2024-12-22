const express = require("express");
const router = express.Router();
const passport = require('passport')


const authControllerUtilites = require('../controllers/auth_utilitiesController');
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
    res.render("auth/login", {
      incorrectCredentials: true,
      errorMessage: req.flash("error")[0],
    });
  });

router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/auth/incorrect_credentials",
      failureFlash: true,
    })(req, res, next);
  });
    
router.get("/register", authControllerSignUP.getSignUp);

router.post("/register", authControllerSignUP.postSignUp);

router.post("/verify-otp/:userId", authControllerSignUP.verifyOTP);

router.post("/resend-otp/:userId", authControllerSignUP.resendOTP);


// Profile settings route
router.get("/profile-setting", authControllerUtilites.profileSetting);
// Change password route
router.get("/change-password", authControllerUtilites.changePassword);

router.post("/change-password", authControllerUtilites.postChangePassword);

// Two-step verification route
router.get("/two-step", authControllerUtilites.twoStep);

// Logout route
router.get("/logout", authControllerUtilites.logout);



module.exports = router;




