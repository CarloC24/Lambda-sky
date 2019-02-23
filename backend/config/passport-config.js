const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/Users");

passport.use(
<<<<<<< HEAD
  new GoogleStrategy(
    {
      // Google+ API Options
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(currentUser => {
        // If user already exists
        if (currentUser) {
          console.log("current user: " + currentUser);
          done(null, currentUser);
        } else {
          // Else create new user
          new User({
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName
          })
            .save()
            .then(newUser => {
              console.log("new user: " + newUser);
              done(null, newUser);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  )
=======
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
              new User({
                  googleId: profile.id,
                  firstName: profile.name.givenName,
                  lastName: profile.name.familyName
              })
              .save()
              .then((newUser) => {
                  console.log('new user: ' + newUser);
                  done(null, newUser);
              })
              .catch(err => console.log(err));
            }
        })
    })
>>>>>>> 28f4364abf3e4cd6df6fa15404afe3b903a346e4
);
//Create the local strategy for passport
passport.use(User.createStrategy());

<<<<<<< HEAD
//Tells passport to put the user in every single request
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//SHORTCUT FOR USER.serializeUser()
// passport.serializeUser((user, done) => {
//     done(null, user.id);
// })

//SHORTCUT for USER.deserializeUser()
// passport.deserializeUser((id, done) => {
//     User.findById(id)
//     .then((user) => {
//         done(null, user.id);
//     })
// })
=======
passport.serializeUser((user, done) => {
      done(null, user.id);
    });

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
>>>>>>> 28f4364abf3e4cd6df6fa15404afe3b903a346e4
