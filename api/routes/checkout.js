const stripe =
  process.env.NODE_ENV === 'production'
    ? require('stripe')(process.env.STRIPE_PRODUCTION_KEY)
    : require('stripe')(process.env.STRIPE_TEST_KEY);

const createRoutes = router => {
  router.route('/checkout').post((req, res) => {
    const { token } = req.body;

    stripe.charges
      .create({
        amount: 2000,
        currency: 'usd',
        source: token,
        description: 'Charge for jenny.rosen@example.com',
      })
      .then(charge => console.log(charge))
      .catch(err => console.log(err))
      .finally(res.json({}));
  });
};

module.exports = {
  createRoutes,
};
