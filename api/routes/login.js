const passport = require('passport');

const createRoutes = router => {
  router.route('/login').post(passport.authenticate('local'), (req, res) => {
    res.json(req.user);
  });

  router.route('/logout').get((req, res) => {
    req.logout();
    res.status(204).end();
  });
};

module.exports = {
  createRoutes,
};
