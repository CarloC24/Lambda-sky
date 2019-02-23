const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  google: {
    googleId: String,
    firstName: String,
    lastName: String
  },
  name: String,
  email: String,
  password: String,
});

module.exports = mongoose.model('user', UserSchema);
