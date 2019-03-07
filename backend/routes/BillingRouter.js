const keys = require("../config/keys");
const stripe = require("stripe")(keys.STRIPE_KEY);
const router = require("express").Router();
const { authCheck } = require("./ProfileRoutes");
const User = require("../models/Users");

async function checkSubscription(req, res, next) {
  const { subscriptionId } = await User.findById(req.user.id);
  if (!subscriptionId) {
    return res.json({ message: "Need a subscription to move forward" });
  }
  const { billing_cycle_anchor } = await stripe.subscriptions.retrieve(
    subscriptionId
  );
  if (billing_cycle_anchor < Date.now()) {
    return res.json({ message: "Please renew your subscription" });
  }
  return next();
}

router.post("/createsubscription", authCheck, async (req, res) => {
  const { email, id } = req.user;
  const customer = await stripe.customers.create({
    email,
    description: "Lambda Sky Customer"
  });
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {
        plan: "prod_EeTnCZOUHlV8LH"
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

router.post("/deletesubscription", authCheck, async (req, res) => {
  const { subscriptionId, customerId } = req.user;
  await stripe.subscription.del(subscriptionId);
  await stripe.customer.del(customerId);
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
