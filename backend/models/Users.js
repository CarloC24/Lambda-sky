const mongoose = require("mongoose");
// const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  google: {
    googleId: String,
    firstName: String,
    lastName: String
  },
  name: String,
  email: String,
  password: String,
  trips: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trips'
  }],
});

// UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("user", UserSchema);
