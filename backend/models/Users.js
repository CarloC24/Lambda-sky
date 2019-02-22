const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: String,
  firstName: String,
  lastName: String
});

module.exports = mongoose.model('User', UserSchema);
