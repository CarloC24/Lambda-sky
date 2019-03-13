const mongoose = require('mongoose');

const FaveHotelsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotels',
        required: true
    }
});


module.exports = mongoose.model('FaveHotels', FaveHotelsSchema);
