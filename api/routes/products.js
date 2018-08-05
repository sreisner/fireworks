const { Product } = require('../db/models');
const { requireAdminAuthentication } = require('./middleware');

const createRoutes = router => {
  router
    .route('/products')
    .get((req, res) => {
      Product.find()
        .select([
          '_id',
          'title',
          'categoryId',
          'description',
          'imageUrls',
          'duration',
          'retailPrice',
          'manufacturer',
          'colors',
          'videoUrl',
          'type',
          'numShots',
          'casePacking',
          'effects',
        ])
        .then(products => res.json(products));
    })
    .post(requireAdminAuthentication, (req, res) => {
      const product = new Product(req.body);
      product
        .save()
        .then(() => res.status(200).end())
        .catch(err => {
          res.status(400).json(err.message);
        });
    });
};

module.exports = {
  createRoutes,
};
