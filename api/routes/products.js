const { Product } = require('../db/models');
const { requireAdminAuthentication } = require('./middleware');

const createRoutes = router => {
  router
    .route('/products')
    .get((req, res) => {
      Product.find()
        .select('_id name price description shortDescription imageUrl')
        .then(products => res.json(products));
    })
    .post(requireAdminAuthentication, (req, res) => {
      const product = new Product(req.body);
      product.save().then(() => res.status(200).end());
    });
};

module.exports = {
  createRoutes,
};
