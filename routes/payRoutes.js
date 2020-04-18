const { Router } = require('express');
const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

const router = Router();

router.post('/api/stripe', requireLogin, async (req, res) => {
  //Create charge
  const charge = await stripe.charges.create({
    amount: 500,
    currency: 'usd',
    description: '$5 for 5 credits',
    source: req.body.id,
  });
  //Update user model
  req.user.credits += 5;
  const user = await req.user.save();

  res.send(user);
});

module.exports = router;
