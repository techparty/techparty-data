/*jslint node: true */

'use strict';

var passport = require('passport');

exports.isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();

    passport.authenticate('local', {
        failureRedirect: '/auth/sign',
    })(req, res, next);
};