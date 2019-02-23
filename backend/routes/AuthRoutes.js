const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/Users');

// ROUTE:   GET auth/login
// DESC:    Tests login route
// ACCESS:  Public
router.get('/login', (req, res) => res.json({login: 'please log in before continuing...'}));

// ROUTE:   GET auth/logout
// DESC:    Users can logout
// ACCESS:  Private
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/auth/login');
});

// ROUTE:   GET auth/google
// DESC:    Allow users to authenticate with google
// ACCESS:  Public
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

// ROUTE:   GET auth/google/redirect
// DESC:    Allow users to authenticate with google
// ACCESS:  Public
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/profile');
});

// ROUTE:   GET auth/register
// DESC:    Register user
// ACCESS:  Public
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        return res.status(400).json({email: 'Email already exists'})
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

module.exports = router; 