'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/index')
const auth = require('../services/auth');

router.get('/', auth.isAuthenticated, controller.renderIndex);

router.get('/analytics/participant/yearly', auth.isAuthenticated, controller.yearlyParticipants);

router.get('/analytics/participant/yearly/registration', auth.isAuthenticated, controller.yearlyRegistrations);

router.get('/analytics/participant/daily', auth.isAuthenticated, controller.dailyParticipants);

router.get('/analytics/participant/daily/present', auth.isAuthenticated, controller.dailyParticipantsPresent);

router.get('/analytics/participant/daily/absent', auth.isAuthenticated, controller.dailyParticipantsAbsent);

module.exports = router;
