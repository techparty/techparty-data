/*jslint node: true */

'use strict';

var passport = require('passport');

exports.renderSignIn = function (req, res) {
    return res.render('auth/signin');
}

exports.signIn = function (req, res) {
    return res.redirect('/');
}

exports.signOut = function (req, res) {
    req.logout();
    return res.redirect('/auth/signin');
}