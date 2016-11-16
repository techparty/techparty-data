'use strict';

// modules
const passport = require('passport');
const log = require('winston');
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
            Model.findOne({ username: username }, (err, user) => {
                if (err) {
                    log.error("Error looking for user.");
                    return done(err);
                }

                if (!user) return done(null, false, { message: 'Incorrect username.' });

                if (!user.verifyPassword(password)) return done(null, false, { message: 'Incorrect password.' });

                return done(null, user);
            });
        });
    }
));

module.exports = passport;
