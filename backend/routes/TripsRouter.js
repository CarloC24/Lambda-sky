const express = require('express');
const router = express.Router();
const Trips = require('../models/Trips');


router.get('/',async (req,res) => {
    const trips = await Trips.find();
    res.json(trips);
})

router.post('/',async (req,res) => {
    await new Trips(req.body).save();
    try {
        res.json({message:'added a trip'})
    } catch (error) {
        res.json(err);
    }
})


module.exports = router;