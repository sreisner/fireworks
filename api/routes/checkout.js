const Order = require('../db/models/order');
const Product = require('../db/models/product');

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
    sendClientSideErrorResponse(res, 'Missing user data in request.');
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

const validateProductsInStock = async productData => {
  return Product.find()
    .then(inventory => {
      for (const requestedProduct of productData) {
        const inventoryProduct = inventory.find(
          item => item._id === requestedProduct._id
        );

        if (
          !inventoryProduct ||
          inventoryProduct.count < requestedProduct.count
        ) {
          return false;
        }
      }

      return true;
    })
    .catch(err => {
      throw err;
    });
};

const validateProductData = async (req, res, next) => {
  const { productData } = req.body;

  if (!productData) {
    sendClientSideErrorResponse(res, 'Missing product data in request.');
  } else if (productData.length <= 0) {
    res.status(204).end();
  } else if (!(await validateProductsInStock(productData))) {
    sendClientSideErrorResponse(
      res,
      'The number of items in our inventory is less than the number of requested items for one or more products.'
    );
  } else {
    next();
  }
};

const validateAmountToCharge = async (req, res, next) => {
  const { productData, amountToCharge } = req.body;

  const inventoryProducts = await Product.find();

  const actualAmountToCharge = productData.reduce((sum, requestedProduct) => {
    const inventoryProduct = inventoryProducts.find(
      p => p._id === requestedProduct._id
    );

    return sum + inventoryProduct.retailPrice * requestedProduct.count;
  }, 0);

  if (actualAmountToCharge !== amountToCharge) {
    sendClientSideErrorResponse(
      res,
      'The computed amount to charge and the amount to charge displayed to the user was different'
    );
  } else {
    next();
  }
};

const chargeCard = async (token, amountToCharge, userData) => {
  return await stripe.charges.create({
    amount: amountToCharge,
    currency: 'usd',
    source: token,
    description: `Charge for ${userData.firstName} ${userData.lastName}`,
  });
};

const createNewOrderRecord = async (userData, productData, amountCharged) => {
  const newOrder = new Order({
    ...userData,
    products: productData,
    amountCharged: amountCharged,
    status: 'Pending Delivery',
  });

  return await newOrder.save();
};

const updateProductCounts = async productData => {
  for (const boughtProduct of productData) {
    const inventoryProduct = await Product.findById(boughtProduct._id);
    inventoryProduct.count -= boughtProduct.count;
    await inventoryProduct.save();
  }
};

const createRoutes = router => {
  router
    .route('/checkout')
    .post(
      validateUserData,
      validateProductData,
      validateAmountToCharge,
      async (req, res) => {
        const { token, userData, productData, amountToCharge } = req.body;

        let charge;
        try {
          charge = await chargeCard(token, amountToCharge, userData);
        } catch (err) {
          return res.status(500).send({
            message: err.message,
          });
        }

        try {
          await createNewOrderRecord(userData, productData, charge.amount);
          if (process.env.NODE_ENV === 'production') {
            await updateProductCounts(productData);
          }
        } catch (err) {
          // TODO:  Return successfully since their card was charged, but
          // indicate in an email to the developers that something went
          // wrong saving data to the database
          console.error(err);
        }

        res.status(204).end();
      }
    );
};

module.exports = {
  createRoutes,
};
