const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
<<<<<<< HEAD
  googleId: String,
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: "Please supply an email address"
  }
=======
  google: {
    googleId: String,
    firstName: String,
    lastName: String
  },
  name: String,
  email: String,
  password: String,
>>>>>>> 28f4364abf3e4cd6df6fa15404afe3b903a346e4
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("user", UserSchema);
