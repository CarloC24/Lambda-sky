const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../validation/profile');

// Load models
const Profile = require('../models/Profiles');
const User = require('../models/Users');

// ROUTE:   GET /profile
// DESC:    Get current user's profile
// ACCESS:  Private

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log("userid", req.user.id)
  const errors = {}
  Profile.findOne({ user: req.user.id })
    .populate('user', ['firstName', 'lastName', 'email'])
    .then(profile => {
      console.log(profile)
      if(!profile) {
        errors.noprofile = 'There is no profile for this user.';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
})

// @route   GET profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['firstName', 'lastName', 'email'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

// ROUTE:   POST /profile
// DESC:    Create or edit user's profile
// ACCESS:  Private

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Bring in validation
  const { errors, isValid } = validateProfileInput(req.body);
  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }
  // Get fields
  const profileFields = {};
  profileFields.user - req.user.id;
  if (req.body.photo) profileFields.photo = req.body.photo;
  if (req.body.dateofbirth) profileFields.dateofbirth = req.body.dateofbirth;
  if (req.body.airport) profileFields.airport = req.body.airport;
  if (req.body.phonenumber) profileFields.phonenumber = req.body.phonenumber;
  // Trip notification
  if (req.body.email) profileFields.tripnotification.email = req.body.tripnotification.email;
  if (req.body.phone) profileFields.tripnotification.phone = req.body.tripnotification.phone;

  Profile.findOne({ user: req.user.id })
  .then(profile => {
    if (profile) {
      // Update 
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      )
      .then(profile => res.json(profile))
      .catch(err => res.status(404).json(err));
    } else {
      // Save new Profile
      new Profile(profileFields)
      .save()
      .then(profile => {
        res.json(profile)
      })
      .catch(err => res.status(404).json(err))
    }
  })
});

// @route   DELETE profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;