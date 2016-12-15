const express = require('express');
const controller = require('../controllers/index');
const AuthService = require('../services/auth');

const router = express.Router();

router
  .route('/')
  .get(AuthService.isAuthenticated(), controller.renderIndex);

router
  .route('/analytics/participant/yearly')
  .get(AuthService.isAuthenticated(), controller.yearlyParticipants);

router
  .route('/analytics/participant/yearly/registration')
  .get(AuthService.isAuthenticated(), controller.yearlyRegistrations);

router
  .route('/analytics/participant/daily')
  .get(AuthService.isAuthenticated(), controller.dailyParticipants);

router
  .route('/analytics/participant/daily/present')
  .get(AuthService.isAuthenticated(), controller.dailyParticipantsPresent);

router
  .route('/analytics/participant/daily/absent')
  .get(AuthService.isAuthenticated(), controller.dailyParticipantsAbsent);

module.exports = router;
