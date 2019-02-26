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
        console.log(profile)
        User.findOne({email: profile._json.emails[0].value})
        .then((currentUser) => {
          // If user already exists
          if(currentUser) {
              console.log('current user: ' + currentUser);
              done(null, currentUser);
          } else {
              // Else create new user
              let newUser = new User();
              newUser.google.googleId = profile.id,
              newUser.email = profile._json.emails[0].value,
              newUser.firstName = profile.name.givenName,
              newUser.lastName = profile.name.familyName
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
  callbackURL: '/auth/facebook/redirect',
  clientID: keys.facebook.appID,
  clientSecret: keys.facebook.appSecret,
  profileFields: ['id', 'emails', 'name']
  }, (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    User.findOne({email: profile.emails[0].value})
    .then((currentUser) => {
      // If user already exists
      if(currentUser) {
          console.log('current user: ' + currentUser);
          done(null, currentUser);
      } else {
          // Else create new user
          let newUser = new User();
          newUser.facebook.facebookId = profile.id,
          newUser.email = profile.emails[0].value,
          newUser.firstName = profile.name.givenName,
          newUser.lastName = profile.name.familyName
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
)

passport.serializeUser((user, done) => {
      done(null, user.id);
    });

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});