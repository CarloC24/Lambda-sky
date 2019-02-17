const mongoose = require('mongoose');
const passportMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String
  },
  name: {
    type: String
  }
});

UserSchema.plugin(passportMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', UserSchema);
