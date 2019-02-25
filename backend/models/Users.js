const mongoose = require("mongoose");
// const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  google: {
    googleId: String,
    firstName: String,
    lastName: String
  },
  facebook: {
    id: String,
    token: String,
    name: String,
    email: String
  },
  name: String,
  email: String,
  password: String
});

// UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model('User', UserSchema);
