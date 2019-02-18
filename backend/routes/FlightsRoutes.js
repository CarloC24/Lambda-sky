const express = require('express');
const Flights = require('../models/Flights');

const router = express.Router();

router.get('/', async (req, res) => {
  const AllFlights = await Flights.find();
  res.json(AllFlights);
});

router.get('/:id', async (req, res) => {
  const SingleFlight = await Flights.findById(req.params.id);
  res.json(SingleFlight);
});

router.post('/', async (req, res) => {
  const NewFlight = req.body;
  await new Flights(NewFlight).save();
  res.json({ message: 'Sucessfully saved a new store' });
});
router.put('/:id', async (req, res) => {
  const updatedFlight = await Flights.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runvalidators: true }
  ).exec();
  res.json(updatedFlight);
});

router.delete('/:id', async (req, res) => {
  await Flights.findByIdAndDelete(req.params.id);
  res.json({ message: 'Sucessfully Deleted Flight' });
});
