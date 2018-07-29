const { Bundle } = require('../db/models');

const createRoutes = router => {
  router.route('/bundles').get((req, res) =>
    Bundle.find()
      .select('_id title subTitle imageUrl contents price')
      .then(bundles => res.json(bundles))
  );
};

module.exports = {
  createRoutes,
};
