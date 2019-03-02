const mongoose = require("mongoose");
// const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  google: {
    googleId: String
  },
  facebook: {
    facebookId: String
  },
  firstName: String,
  lastName: String,
  email: String,
  password: String
});

// UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model('Users', UserSchema);
