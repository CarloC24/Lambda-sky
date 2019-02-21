const express = require('express');
const router = express.Router();
const passport = require('passport');

// ROUTE:   GET api/users/test
// DESC:    Tests users route
// ACCESS:  Public
router.get('/test', (req, res) => res.json({test: '/api/users route works'}));

// ROUTE:   GET api/users/google
// DESC:    Allow users to authenticate with google
// ACCESS:  Public
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

// ROUTE:   GET api/users/google/redirect
// DESC:    Allow users to authenticate with google
// ACCESS:  Public
router.get('/google/redirect', (req,res) => {
  res.json({auth: 'api/users/google/redirect route works'})
});

module.exports = router; 