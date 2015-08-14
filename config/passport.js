/*jslint node: true */

'use strict';

var passport = require('passport');
var log = require('winston');
var LocalStrategy = require('passport-local').Strategy;
var UserModel = require('../app/models/v1/user');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    UserModel.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        process.nextTick(function () {
            UserModel.findOne({ username: username }, function (err, user) {
                if (err) {
                    log.error("Error looking for user.");
                    return done(err);
                }

                if (!user)
                    return done(null, false, { message: 'Incorrect username.' });

                if (!user.verifyPassword(password))
                    return done(null, false, { message: 'Incorrect password.' });

                return done(null, user);
            });
        });
    }
));

module.exports = passport;