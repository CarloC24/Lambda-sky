const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
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
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("user", UserSchema);
