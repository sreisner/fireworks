const { canDeliverToZipCode } = require('./utils');

const createRoutes = router => {
  router.route('/zip-codes/:zipCode').get((req, res) =>
    res.json({
      canDeliver: canDeliverToZipCode(req.params.zipCode),
    })
  );
};

module.exports = {
  createRoutes,
};
