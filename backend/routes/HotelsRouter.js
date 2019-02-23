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


module.exports = router;