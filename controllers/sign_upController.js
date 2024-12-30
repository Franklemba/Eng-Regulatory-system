const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const {registerUser}=require('../utilities/registerUser');
const {sendOTPemail} = require('../utilities/gmail');

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  
  exports.getSignUp =  (req,res) => {

    const layout = "layouts/non_headerLayout"

    res.render("auth/register",{
      layout
    })

};
  
  // Modified sign-up route
  exports.postSignUp =  async (req, res) => {

    const { nameOfEntity, typeOfEntity, businessRegistrationNumber, email,password, phoneNumber , address, city, country  } = req.body;
  
    try {

      const newUser = await registerUser({ nameOfEntity, typeOfEntity, businessRegistrationNumber, email,password, phoneNumber , address, city, country });
      const layout = "layouts/non_headerLayout"
      if (!newUser) {
        return res.render("auth/login", {
          incorrectCredentials: true,
          errorMessage: 'Account already exists, login instead',
          layout
        });
      }
  
      // Generate OTP
      const otp = generateOTP();
      const otpExpiration = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
      // console.log(otp);
  
      // Save OTP to user document
      newUser.verificationOTP = await bcrypt.hash(otp, 10); // Hash the OTP
      newUser.otpExpiration = otpExpiration;
      await newUser.save();
  
      // res.redirect('/dashboard');

     sendOTPemail(nameOfEntity, email, otp)
  
      res.render("auth/email_verification", {
        message: `We have sent a verification OTP to ${email}. Please enter the OTP to verify your email. Expires in 15 minutes`,
        url: `/auth/verify-otp/${newUser._id}`,
        buttonText: "Verify OTP",
        user: req.user,
        incorrectCredentials: false,
        errorMessage: '',
        layout
      });
  
    } catch (error) {
      console.error(`Error registering user: ${error.message}`);
      res.redirect('/login');
    }
  };
  
  // New route for OTP verification

  exports.verifyOTP = async (req, res) => {

    const { userId } = req.params;
    const { otp } = req.body;
  
    try {
      // res.redirect('/merchant');
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).send('User not found');
      }
  
      if (!user.verificationOTP || user.otpExpiration < new Date()) {
        return res.render("auth/email_verification", {
          message: 'OTP has expired. Please request a new one.',
          url: `/auth/resend-otp/${userId}`,
          buttonText: "Resend OTP",
          user: req.user,
          incorrectCredentials: true,
          errorMessage: 'OTP expired'
        });
      }
  
      const isValid = await bcrypt.compare(otp, user.verificationOTP);
      if (!isValid) {
        return res.render("auth/email_verification", {
          message: 'Invalid OTP. Please try again.',
          url: `/auth/verify-otp/${userId}`,
          buttonText: "Verify OTP",
          user: req.user,
          incorrectCredentials: true,
          errorMessage: 'Invalid OTP'
        });
      }
  
      // OTP is valid, mark user as verified
      user.isVerified = true;
      user.verificationOTP = undefined;
      user.otpExpiration = undefined;
      await user.save();
  
      req.login(user, (err) => {
        if (err) {
          console.error(`Error logging in user: ${err.message}`);
          return res.status(500).send('An error occurred during login');
        }
  
        // Redirect to the home page or any other route after login
        res.redirect('/dashboard');
      });

        return
    
    } catch (error) {
      console.error(`Error verifying OTP: ${error.message}`);
      res.status(500).send('An error occurred during verification');
    }
  };
  
  // New route for resending OTP
  exports.resendOTP =  async (req, res) => {
    const { userId } = req.params;
    const layout = "layouts/non_headerLayout"

    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(400).send('User not found');
      }
  
      // Generate new OTP
      const otp = generateOTP();
      const otpExpiration = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
  
      
      sendOTPemail(`${tradeName}`, user.email, otp)
      // Save new OTP to user document
      user.verificationOTP = await bcrypt.hash(otp, 10); 
      user.otpExpiration = otpExpiration;
      await user.save();
  
     
  
      res.render("auth/email_verification", {
        message: `We have sent a new verification OTP to ${user.email}. Please enter the OTP to verify your email. Expires in 15 minutes`,
        url: `/auth/verify-otp/${userId}`,
        buttonText: "Verify OTP",
        user: req.user,
        incorrectCredentials: false,
        errorMessage: '',
        layout
      });
  
    } catch (error) {
      console.error(`Error resending OTP: ${error.message}`);
      res.status(500).send('An error occurred while resending OTP');
    }

  };