const stripe = require("stripe")("keyboi");
const router = require("express").Router();
const { authCheck } = require("./ProfileRoutes");

router.post("/createsubscription", authCheck, async (req, res) => {
  const { token, amount } = req.query;
  const { email } = req.user;
  await stripe.charges.create({
    description: `Yay a new customer named ${email}`,
    currency: "usd",
    token,
    amount
  });
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
});

module.exports = router;
