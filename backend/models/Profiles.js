const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 // Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  photo: {
    type: String
  },
  dateofbirth: {
    type: Date
  },
  airport: {
    type: String,
    required: true
  },
  trips: [{ 
    type: Schema.Types.ObjectId,
    ref: 'tripsschemas'
  }],
  phonenumber: {
    type: String,
    required: true
  },
  tripnotification: {
    email: Boolean,
    phone: Boolean,
  }
});

module.exports = Profile = mongoose.model('Profile', ProfileSchema);