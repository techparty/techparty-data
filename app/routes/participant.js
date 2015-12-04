/*jslint node: true */

'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../controllers/participant')
var auth = require('../services/auth');

router.get('/', auth.isAuthenticated, controller.renderIndex);

router.get('/:year', auth.isAuthenticated, controller.renderIndex);

router.delete('/:id', auth.isAuthenticated, controller.delete);

module.exports = router;
