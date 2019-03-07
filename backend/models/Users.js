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
  password: String,
  customerId:String,
  subscriptionId:String,
  trips: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trips'
  }],
});

// UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model('User', UserSchema);
