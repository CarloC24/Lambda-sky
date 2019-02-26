const mongoose = require('mongoose');

const TripsSchema = new mongoose.Schema({
  userId: { type: Mongooose.Schema.Types.ObjectId, ref: 'user' },
  hotels: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotels'
  }],
  cars: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CarRental'
  }],
  flights: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight'
  }],
});

module.exports = mongoose.model('Trips', TripsSchema);
