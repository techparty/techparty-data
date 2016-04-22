'use strict';

const passport = require('passport');

module.exports = {

    isAuthenticated : (req, res, next) => {
        if (req.isAuthenticated()) return next();

        passport.authenticate('local', {
            failureRedirect: '/auth/signin',
        })(req, res, next);
    }

};