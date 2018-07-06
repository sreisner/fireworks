const requireAdminAuthentication = (req, res, next) => {
  if (req.isUnauthenticated() || !req.user.isAdmin) {
    res.status(401).end();
  } else {
    next();
  }
};

const requireUserAuthentication = (req, res, next) => {
  if (req.isUnauthenticated()) {
    res.status(401).end();
  } else {
    next();
  }
};

module.exports = {
  requireAdminAuthentication,
  requireUserAuthentication,
};
