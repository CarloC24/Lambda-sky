const express = require('express');
const CarRentalSchema = require('../models/CarRental');
const router = express.Router();

router.get('/', async (req, res) => {
  const AllCarsR = await CarRentalSchema.find();
  res.json(AllCarsR);
});

router.post('/', async (req, res) => {
  const NewCarRental = new CarRentalSchema(req.body);
  await NewCarRental.save();
  res.json({ message: 'You added a new Car Rental ' });
});


module.exports = router;