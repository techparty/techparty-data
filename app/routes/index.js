/*jslint node: true */

'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../controllers/index')
var auth = require('../services/auth');

router.get('/', auth.isAuthenticated, controller.renderIndex);

router.get('/analytics/participant/yearly', auth.isAuthenticated, controller.yearlyParticipants);

router.get('/analytics/participant/daily', auth.isAuthenticated, controller.dailyParticipants);

router.get('/analytics/participant/daily/present', auth.isAuthenticated, controller.dailyParticipantsPresent);

router.get('/analytics/participant/daily/absent', auth.isAuthenticated, controller.dailyParticipantsAbsent);

module.exports = router;
