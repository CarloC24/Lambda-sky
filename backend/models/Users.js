const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);

// const mongoose = require('mongoose');
// const passportMongoose = require('passport-local-mongoose');

// const UserSchema = new mongoose.Schema({
//   email: {
//     type: String
//   },
//   name: {
//     type: String
//   }
// });

// UserSchema.plugin(passportMongoose, { usernameField: 'email' });

// module.exports = mongoose.model('User', UserSchema);
