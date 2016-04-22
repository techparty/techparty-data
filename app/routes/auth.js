'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');
const passport = require('passport');
const auth = require('../services/auth');

router
    .get('/signin', controller.renderSignIn)
    .post('/signin', passport.authenticate('local'), controller.signIn);

router
    .get('/signout', auth.isAuthenticated, controller.signOut)

module.exports = router;
