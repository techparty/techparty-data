// modules
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// models
const Model = require('../app/models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Model.findById(id, done);
});

passport.use(new LocalStrategy(
  (username, password, done) => {
    process.nextTick(() => {
      Model
        .findOne({ username })
        .then((user) => {
          if (!user) return done(null, false, { message: 'Incorrect username.' });
          if (!user.verifyPassword(password)) return done(null, false, { message: 'Incorrect password.' });
          done(null, user);
        })
        .catch(done);
    });
  }
));

module.exports = passport;
