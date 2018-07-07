const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const users = require('./users');
const login = require('./login');
const products = require('./products');

const configureRoutes = app => {
  configureMiddleware(app);
  createRoutes(app);
};

const configureMiddleware = app => {
  if (process.env.NODE_ENV !== 'production') {
    app.use(
      cors({
        origin: true,
        credentials: true,
      })
    );
  }

  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'secret',
      saveUninitialized: true,
      resave: true,
      cookie: {
        maxAge: +process.env.SESSION_MAX_AGE || 604800000,
      },
      name: 'sessionid',
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
};

const createRoutes = app => {
  users.createRoutes(app);
  login.createRoutes(app);
  products.createRoutes(app);

  const authenticatedRouter = getAuthenticatedRouter();
  app.use(authenticatedRouter);
};

const getAuthenticatedRouter = () => {
  const router = express.Router();

  router.use((req, res, next) => {
    if (req.isUnauthenticated()) {
      res.status(401).end();
    } else {
      next();
    }
  });

  return router;
};

module.exports = {
  configureRoutes,
};