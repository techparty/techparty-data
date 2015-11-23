/*jslint node: true */

'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../controllers/auth');
var passport = require('passport');
var auth = require('../services/auth');

router
    .get('/signin', controller.renderSignIn)
    .post('/signin', passport.authenticate('local'), controller.signIn);

router
    .get('/signout', auth.isAuthenticated, controller.signOut)

module.exports = router;
