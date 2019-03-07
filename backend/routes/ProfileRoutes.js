const express = require('express');
const router = express.Router();

const authCheck = (req, res, next) => {
  // If user is not logged in
  if(!req.user) {
    res.redirect('/auth/login');
    // Else go to the next function (router.get)
  } else {
    next();
  }
};

router.get('/', authCheck, (req, res) => {
  res.send(`Welcome, ${req.user.email}!`)
});

module.exports = router;