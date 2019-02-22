const express = require('express');
const router = express.Router();
const passport = require('passport');

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

module.exports = router; 