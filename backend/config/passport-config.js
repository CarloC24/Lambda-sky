const passport = require('passport');
const keys = require('./keys');
const User = require('../models/Users');

// Social strategies
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook').Strategy;

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
              done(null, currentUser);
          } else {
              // Else create new user
              let newUser = new User();
              newUser.google.googleId = profile.id,
              newUser.google.firstName = profile.name.givenName,
              newUser.google.lastName = profile.name.familyName
              // Save new user
              newUser.save()
              .then((newUser) => {
                  console.log('new user: ' + newUser);
                  done(null, newUser);
              })
              .catch(err => console.log(err));
            }
        })
    })
);

passport.use(new FacebookStrategy({
  // Google+ API Keys
  callbackURL: '/auth/facebook/callback',
  clientID: keys.facebook.appID,
  clientSecret: keys.facebook.appSecret
  }, (accessToken, refreshToken, profile, done) => {
    // callback
    console.log(profile)
  })
)

passport.serializeUser((user, done) => {
      done(null, user.id);
    });

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});