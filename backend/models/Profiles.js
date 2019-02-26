const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 // Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  location: {
    type: String
  },
  bio: {
    type: String
  },
  trips: [{ 
    type: Schema.Types.ObjectId,
    ref: 'tripsschemas'
  }],
  social: {
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  }
});

 module.exports = Profile = mongoose.model('Profile', ProfileSchema);