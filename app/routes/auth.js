/*jslint node: true */

'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../controllers/auth');
var passport = require('passport');

router
    .get('/sign', controller.renderSign)
    .post('/sign', passport.authenticate('local'), controller.sign);

module.exports = router;
