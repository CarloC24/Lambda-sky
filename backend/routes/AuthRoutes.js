const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/Users");

// ROUTE:   GET auth/test
// DESC:    Tests users route
// ACCESS:  Public
router.get("/test", (req, res) => res.json({ test: "/auth/test route works" }));

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
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.send(`Welcome, ${req.user.firstName}!`);
});
router.get("/me", (req, res) => {
  res.json("cool");
});

router.post(
  "/local/register",
  async (req, res) => {
    const user = new User({ email: req.body.email, name: req.body.name });
    User.register(user, req.body.password);
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

module.exports = router;
