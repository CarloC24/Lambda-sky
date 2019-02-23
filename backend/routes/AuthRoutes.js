const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const passport = require("passport");
const User = require("../models/Users");
=======
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys')
>>>>>>> 28f4364abf3e4cd6df6fa15404afe3b903a346e4

// Load validation
const validateRegisterInput = require('../validation/registration')
const validateLoginInput = require('../validation/login')

// ROUTE:   GET auth/login
// DESC:    Tests login route
// ACCESS:  Public
<<<<<<< HEAD
router.get("/test", (req, res) => res.json({ test: "/auth/test route works" }));
=======
router.get('/login', (req, res) => res.json({login: 'please log in before continuing...'}));

// ROUTE:   GET auth/logout
// DESC:    Users can logout
// ACCESS:  Private
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/auth/login');
});
>>>>>>> 28f4364abf3e4cd6df6fa15404afe3b903a346e4

// ROUTE:   GET auth/google
// DESC:    Allow users to authenticate with google
// ACCESS:  Public
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

// ROUTE:   GET auth/google/redirect
// DESC:    Allow users to authenticate with google
// ACCESS:  Public
<<<<<<< HEAD
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.send(`Welcome, ${req.user.firstName}!`);
=======
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/profile');
>>>>>>> 28f4364abf3e4cd6df6fa15404afe3b903a346e4
});
router.get("/me", (req, res) => {
  res.json(req.user);
});

router.get("/alluser", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post(
  "/local/register",
  async (req, res) => {
    const user = new User({
      email: req.body.email,
      lastName: req.body.lastName
    });
    console.log(user);
    await User.register(user, req.body.password);
    next();
  },
  passport.authenticate("local")
);

router.post(
  (req, res, next) => {
    next();
  },
  passport.authenticate("local", {
    successMessage: "successfully logged in!",
    failureMessage: "failed login"
  }),
  (req, res) => {
    res.json({ message: "yay" });
  }
);

<<<<<<< HEAD
module.exports = router;
=======
// ROUTE:   POST auth/register
// DESC:    Register user
// ACCESS:  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      } else {
         const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });

         bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })
      }
    })
})

// ROUTE:   POST api/users/login
// DESC:    Login User / Return JWT Token
// ACCESS:  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

   // Find user by email
  User.findOne({email})
    .then(user => {
      // Check for user
      if(!user) {
        errors.email = 'You have entered an invalid email or password.';
        return res.status(404).json(errors);
      }

       // Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            // User matched

             // Create JWT payload
             const payload = { id: user.id, name: user.name, avatar: user.avatar }

             // Sign token
            jwt.sign(
              payload, 
              keys.tokenKey, 
              { expiresIn: 3600 }, 
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                })
            });
          } else {
            return res.status(400).json({password: 'You have entered an invalid email or password.'});
          }
        })
    })
})


module.exports = router; 
>>>>>>> 28f4364abf3e4cd6df6fa15404afe3b903a346e4
