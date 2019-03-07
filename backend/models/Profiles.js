const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 // Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
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