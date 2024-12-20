const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

// User.deleteMany({}).then((done)=>{
//   console.log(done)
// });
async function registerUser(
    {
      businessName,
      firstName,
      lastName,
      email,
      country,
      phone,
      streetAddress, city, province,
      password
    }
  ) {
    try {
      // Generate a salt to use for hashing the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
     
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        // If a user with the same email exists, throw an error
        console.log(`User ${existingUser.email} already exists`);
        return null;
      }
  
      // Create a new user document with the hashed password
      const user = new User({
        businessName,
        firstName,
        lastName,
        phone,
        email,
        password:hashedPassword,
        streetAddress, 
        city, province, country 
      });
     
  
      // Save the user document to the database
      await user.save();

      console.log(user);

      return user;
      // console.log(`User ${firstName} registered successfully`);
    } catch (error) {
      console.error(`Error registering user: ${error.message}`);
    }
  }



 module.exports = { registerUser };