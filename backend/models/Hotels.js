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
}, {
  toJSON: { virtuals: true }
});

HotelsSchema.virtual('users', {
  ref: 'FaveHotels',
  localField: '_id',
  foreignField: 'hotelId'
})

module.exports = mongoose.model('Hotels', HotelsSchema);
