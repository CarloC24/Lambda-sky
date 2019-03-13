const express = require('express');
const router = express.Router();
const Hotels = require('../models/Hotels');


router.get('/',async (req,res) => {
    const hotels = await Hotels.find();
    res.json(hotels);
})

router.post('/',async (req,res) => {
    await new Hotels(req.body).save();
    try {
        res.json({message:'added a store'})
    } catch (error) {
        res.json(err);
    }
})

// ROUTE:   GET hotel/:userId/favehotel
// DESC:    Get all favorite hotels for a particular user
// ACCESS:  Public
router.get('/:userId/favehotel', async (req, res) => {
    try {
        const faveHotel = await FaveHotels.find({ userId: req.params.userId })

        res.status(200).json(faveHotel);
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;