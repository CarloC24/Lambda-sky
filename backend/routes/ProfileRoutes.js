const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`Welcome, ${req.user.firstName}!`)
});

module.exports = router;