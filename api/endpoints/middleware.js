const requireAdminAuthentication = (res, req, next) => {
  if (req.isUnauthenticated() || !req.user.isAdmin) {
    res.status(401).end();
  } else {
    next();
  }
};

const requireUserAuthentication = (res, req, next) => {
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
