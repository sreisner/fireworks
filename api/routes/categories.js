const { Category } = require('../db/models');

const createRoutes = router => {
  router.route('/categories').get((req, res) =>
    Category.find()
      .select('_id singularName pluralName')
      .then(categories => res.json(categories))
  );
};

module.exports = {
  createRoutes,
};
