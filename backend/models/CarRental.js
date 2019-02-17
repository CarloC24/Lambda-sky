const mongoose = require('mongoose');

const CarRentalSchema = new mongoose.Schema({
  carName: {
    type: String
  }
});

module.exports = mongoose.model('CarRental', CarRentalSchema);
