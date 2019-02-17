const mongoose = require('mongoose');

const TripsSchema = new mongoose.Schema({
  name: { type: String }
});

module.exports = mongoose.model('TripsSchema', TripsSchema);
