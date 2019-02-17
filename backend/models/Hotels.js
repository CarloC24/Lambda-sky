const mongoose = require('mongoose');

const HotelsSchema = new mongoose.Schema({
  name: {
    type: String
  }
});

module.exports = mongoose.model('Hotels', HotelsSchema);
