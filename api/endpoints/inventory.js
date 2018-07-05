const { Inventory } = require('../db/models');

const createEndpoints = router => {
  router.route('/inventory').get((req, res) => {
    Inventory.find().then(inventory => res.json(inventory));
  });
};

module.exports = {
  createEndpoints,
};
