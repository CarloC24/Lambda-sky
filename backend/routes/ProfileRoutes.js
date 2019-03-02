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

// ROUTE:   GET api/profile
// DESC:    Get current user's profile
// ACCESS:  Private

router.get('/', authCheck, (req, res) => {
  const errors = {}
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user.';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
})

router.post('/', authCheck, (req, res) => {
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
    const errors = {}
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

module.exports = router;