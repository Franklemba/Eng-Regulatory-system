const { response } = require("express");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

exports.profileSetting = (req, res) => {
  const layout = "layouts/non_headerLayout"
    res.render("auth/profile_setting", {
        layout,
        pageTitle: 'profile-setting',
        user: req.user
    });
};

exports.changePassword = (req, res) => {
  const layout = "layouts/non_headerLayout"
    res.render("auth/change_password", {
        layout,
        pageTitle: 'change-password',
        user: req.user
    });
};

exports.postChangePassword = async (req, res) => {
    const { old_pass, password } = req.body;

    try{

        const user = await User.findOne({email:req.user.email});
    
        const isMatch =  bcrypt.compare(old_pass, user.password);

        if(isMatch){
            const salt = await bcrypt.genSalt(10);

            const hashedPassword = await bcrypt.hash(password, salt);
            
            user.password = hashedPassword;
            user.save();

            console.log(user);

        }else{
            response.redirect
            console.log("incorrect password");
        }
    }catch(err){
          console.log(err);
          return err.message;
    }


}

exports.twoStep = (req, res) => {
  const layout = "layouts/non_headerLayout"
    res.render("auth/two_step", {
        layout,
        pageTitle: 'two-step',
        user: req.user
    });
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
          // Handle error as needed
          res.status(500).send("Internal Server Error");
        } else {
          // Redirect the user to the login or home page
          res.redirect("/auth/login"); // You can replace '/' with the desired destination
        }
      });
};
