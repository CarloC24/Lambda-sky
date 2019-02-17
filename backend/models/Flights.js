const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  name: {
    type: String
  }
});

module.exports = mongoose.model('Flight', FlightSchema);
