
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');

// User.deleteMany().then((done)=>{
//   console.log(done)
// })

module.exports = function(passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        // Find user by email
        const user = await User.findOne({ email });

        
        if (!user) {
          return done(null, false, { message: 'The email you entered is not registered' });
        }

        // Check if the email is verified
        if (!user.isEmailVerified) {
          return done(null, false, { message: 'Please verify your email before logging in.' });
        }

        // Match password
        const isMatch =  bcrypt.compare(password, user.password);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};