/*jslint node: true */

'use strict';

var passport = require('passport');

exports.renderSign = function (req, res, next) {
    return res.render('auth/sign');
}

exports.sign = function (req, res, next) {
    return res.redirect('/admin');
}