const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/Users');

passport.use(
  new GoogleStrategy({
      // Google+ API Options
      callbackURL: '/auth/google/redirect',
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
      // passport callback function
      console.log('passport callback function fired:');
      console.log(profile);
      new User({
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName
      })
      .save()
      .then((newUser) => {
          console.log('new user: ' + newUser);
      });
  })
);

// passport.deserializeUser(
//     User.deserializeUser()
// )

// passport.serializeUser(
//     User.serializeUser()
// )
