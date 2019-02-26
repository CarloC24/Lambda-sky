const mongoose = require('mongoose');

const TripsSchema = new mongoose.Schema({
  userId: { type: Mongooose.Schema.Types.ObjectId, ref: 'user' },
  hotel: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotels'
  }],
  car: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CarRental'
  }],
  flight: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight'
  }],
});

module.exports = mongoose.model('Trips', TripsSchema);
