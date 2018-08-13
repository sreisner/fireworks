const Order = require('../db/models/order');

const { canDeliverToZipCode } = require('./utils');

const stripe =
  process.env.NODE_ENV === 'production'
    ? require('stripe')(process.env.STRIPE_PRODUCTION_KEY)
    : require('stripe')(process.env.STRIPE_TEST_KEY);

const VALID_EMAIL_REGEX = /\S+@\S+/;

const sendClientSideErrorResponse = (res, message) => {
  res.status(400).send({
    message,
  });
};

const validateName = userData => {
  return userData.firstName && userData.lastName;
};

const validateEmailAddress = userData => {
  return userData.email && VALID_EMAIL_REGEX.test(userData.email);
};

const validateDeliveryAddress = userData => {
  return userData.street && userData.city && userData.state && userData.zip;
};

const validateCanDeliverToZipCode = zip => {
  return canDeliverToZipCode(zip);
};

const validateUserData = (req, res, next) => {
  const { userData } = req.body;

  if (!userData) {
    sendClientSideErrorResponse(res, 'Missing user data in request');
  } else if (!validateName(userData)) {
    sendClientSideErrorResponse(res, 'You must submit a first and last name.');
  } else if (!validateEmailAddress(userData)) {
    sendClientSideErrorResponse(res, 'You must submit a valid email address.');
  } else if (!validateDeliveryAddress(userData)) {
    sendClientSideErrorResponse(
      res,
      'You must submit a valid street address for delivery.'
    );
  } else if (!validateCanDeliverToZipCode(userData.zip)) {
    sendClientSideErrorResponse(
      res,
      `We do not currently deliver to given zip code: ${userData.zip}`
    );
  } else {
    next();
  }
};

// TODO:  Validate that all items in productData exist in our database
// TODO:  Validate that all items in productData are in stock
validateProductData = (req, res, next) => {
  const { productData } = req.body;

  if (!productData) {
    sendClientSideErrorResponse(res, 'Missing product data in request');
  } else if (productData.length <= 0) {
    res.status(204).end();
  } else {
    next();
  }
};

// TODO:  Validate that the given amountToCharge matches the calculated amount
// to charge
validateAmountToCharge = (req, res, next) => {
  const { amountToCharge } = req.body;

  next();
};

const createRoutes = router => {
  router
    .route('/checkout')
    .post(
      validateUserData,
      validateProductData,
      validateAmountToCharge,
      (req, res) => {
        const { token, userData, productData, amountToCharge } = req.body;

        stripe.charges
          .create({
            amount: amountToCharge,
            currency: 'usd',
            source: token,
            description: `Charge for ${userData.firstName} ${
              userData.lastName
            }`,
            email: userData.email,
          })
          .then(charge => {
            const newOrder = new Order({
              ...userData,
              products: productData,
              amountCharged: charge.amount,
              status: 'Pending Delivery',
            });

            newOrder.save((err, order) => {
              if (err) {
                // TODO:  Return successfully since their card was charged, but
                // indicate in an email that the record was not saved to the
                // database
                return res.status(500).json(err.message);
              }

              res.status(204).end();
            });
          })
          .catch(err =>
            res.status(500).send({
              message: err.message,
            })
          );
      }
    );
};

module.exports = {
  createRoutes,
};
