const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  google: {
    googleId: String
  },
  facebook: {
    facebookId: String
  },
  email: String,
  password: String,
  customerId:String,
  subscriptionId:String,
  trips: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trips'
  }]
}, {
  toJSON: { virtuals: true }
});

UserSchema.virtual('hotels', {
  ref: 'FaveHotels',
  localField: '_id',
  foreignField: 'userId'
})

// UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model('Users', UserSchema);
