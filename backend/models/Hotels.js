const mongoose = require('mongoose');

const HotelsSchema = new mongoose.Schema({
  name: {
    type: String
  },
  location: {
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
});

module.exports = mongoose.model('Hotels', HotelsSchema);
