const mongoose = require('mongoose');

const TripsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  startLocation: {
    address: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    }
  },
  connectingLocations: [
    {
      address: {
        type: String
      },
      city: {
        type: String
      },
      state: {
        type: String
      }
    }
  ],
  endLocation: {
    address: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    }
  },
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
