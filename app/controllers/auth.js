'use strict';

const passport = require('passport');

module.exports = {

    renderSignIn : (req, res) => {
        return res.render('auth/signin');
    },

    signIn : (req, res) => {
        return res.redirect('/');
    },

    signOut : (req, res) => {
        req.logout();
        return res.redirect('/auth/signin');
    }

};