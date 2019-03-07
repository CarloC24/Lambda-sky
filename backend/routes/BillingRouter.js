const stripe = require("stripe")("keyboi");
const router = require("express").Router();
const { authCheck } = require("./ProfileRoutes");
const User = require("../models/Users");

router.post("/createsubscription", authCheck, async (req, res) => {
  const { token, amount } = req.query;
  const { email, id } = req.user;
  const customer = await stripe.customers.create({
    email,
    description: "Lambda Sky Customer"
  });
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {
        plan: "make a plan"
      }
    ]
  });
  const updatedUser = {
    ...req.user,
    customerId: customer.id,
    subscriptionId: subscription.id
  };
  await User.findByIdAndUpdate(id, updatedUser, {
    new: true,
    runValidators: true
  });
  res.json({ message: "Thanks you just purchased a subscription" });
});

router.post("/deletesubscription", async (req, res) => {
  const { subscriptionId } = req.user;
  await stripe.subscription.del(subscriptionId);
  const updatedUser = {
    ...req.user,
    customerId: null,
    subscriptionId: null
  };
  await User.findByIdAndUpdate(id, updatedUser, {
    new: true,
    runValidators: true
  });
  res.json({ message: "Deleted your subscription" });
});

module.exports = router;
