const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();

const Hotels = require('../models/Hotels');
const Users = require('../models/Users');
const FaveHotels = require('../models/FaveHotels');

// ROUTE:   GET users/:userId/hotels
// DESC:    Get a list of all hotels associated with a particular user
// ACCESS:  Public
router.get('/:userId/hotels', async (req, res) => {
    try {
        const users =  await Users.aggregate([
            { '$match': { '_id': new mongoose.Types.ObjectId(req.params.userId) }},
            { '$lookup': {
                'from': FaveHotels.collection.name,
                'localField': '_id',
                'foreignField': 'userId',
                'as': 'hotels'
            }},
            { '$unwind': '$hotels' },
            { '$lookup': {
            'from': Hotels.collection.name,
            'localField': 'hotels.hotelId',
            'foreignField': '_id',
            'as': 'hotels'
            }},
            { '$unwind': '$hotels' },
            { '$group': {
            '_id': '$_id',
            'email': { '$first': '$email' },
            'hotels': { '$push': '$hotels' }
            }},
        ]);

        res.status(200).json(users);
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;