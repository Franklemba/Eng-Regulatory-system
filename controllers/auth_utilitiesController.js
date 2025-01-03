const { response } = require("express");
const User = require("../models/userSchema");
// User.deleteMany({email:'chisalecharles32@gmail.com'}).then((done)=>console.log(done))
const bcrypt = require("bcrypt");

exports.profileSetting = (req, res) => {
  const layout = "layouts/non_headerLayout"
    res.render("auth/profile_setting", {
        layout,
        pageTitle: 'profile-setting',
        user: req.user
    });
};

exports.updateProfile = (async(req,res)=>{

  try {
    const userId = req.user._id; // Adjust based on session management
    const updatedData = req.body;
console.log(updatedData)
    // Find and update the user
    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
}
})

exports.changePassword = (req, res) => {
  const layout = "layouts/dashboardHeader"
    res.render("auth/updatePassword", {
        layout,
        pageTitle: 'Update password',
        user: req.user,
        message:''
    });
};

exports.postChangePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try{

        const user = await User.findOne({_id:req.user._id});
    
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if(isMatch){
            const salt = await bcrypt.genSalt(10);

            const hashedPassword = await bcrypt.hash(newPassword, salt);
            
            user.password = hashedPassword;
            user.save();
            console.log(newPassword);
            res.redirect("/dashboard");
        }else{
          const layout = "layouts/dashboardHeader"
          res.render("auth/updatePassword", {
              layout,
              pageTitle: 'Update password',
              user: req.user,
              message:"Incorrect Password"
          });
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
