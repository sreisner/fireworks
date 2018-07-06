const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

const configurePassport = app => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
      },
      (email, password, done) => {
        const filter = { email };
        const callback = (err, user) => {
          if (err) {
            return done(err);
          }

          if (!user) {
            return done(null, false);
          }

          bcrypt.compare(password, user.password, (err, match) => {
            if (err) {
              res
                .status(500)
                .send('An unknown error occurred.  Please try again later.');
            }

            if (match) {
              done(null, {
                id: user.id,
                email: user.email,
              });
            } else {
              done(null, false);
            }
          });
        };

        User.findOne(filter, callback);
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) =>
    User.findById(id, (err, user) => done(err, user.toObject()))
  );
};

module.exports = {
  configurePassport,
};
