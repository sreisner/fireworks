const { Product } = require('../db/models');

const createRoutes = router => {
  router.route('/products').get((req, res) => {
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
  });
};

module.exports = {
  createRoutes,
};
