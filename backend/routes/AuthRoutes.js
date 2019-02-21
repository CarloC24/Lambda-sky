const express = require('express');
const router = express.Router();
const passport = require('passport');

// ROUTE:   GET auth/test
// DESC:    Tests users route
// ACCESS:  Public
router.get('/test', (req, res) => res.json({test: '/auth/test route works'}));

// ROUTE:   GET auth/google
// DESC:    Allow users to authenticate with google
// ACCESS:  Public
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

// ROUTE:   GET auth/google/redirect
// DESC:    Allow users to authenticate with google
// ACCESS:  Public
router.get('/google/redirect', (req,res) => {
  res.send('auth/google/redirect route works')
});

module.exports = router; 