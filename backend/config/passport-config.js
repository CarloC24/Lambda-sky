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
    
      User.findOne({googleId: profile.id})
      .then((currentUser) => {
        // If user already exists
        if(currentUser) {
            console.log('current user: ' + currentUser);
        } else {
            // Else create new user
            new User({
                googleId: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName
            })
            .save()
            .then((newUser) => {
                console.log('new user: ' + newUser);
            })
            .catch((err)=> {console.log(err)})
        }
      })

  })
);
