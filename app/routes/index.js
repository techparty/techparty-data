/*jslint node: true */

'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../controllers/index')
var auth = require('../services/auth');

router.get('/', auth.isAuthenticated, controller.renderIndex);

module.exports = router;
