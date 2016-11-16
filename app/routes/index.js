const express = require('express');
const controller = require('../controllers/index')
const auth = require('../services/auth');

const router = express.Router();

router.use(auth.isAuthenticated);

router
  .route('/')
  .get(controller.renderIndex);

router
  .route('/analytics/participant/yearly')
  .get(controller.yearlyParticipants);

router
  .route('/analytics/participant/yearly/registration')
  .get(controller.yearlyRegistrations);

router
  .route('/analytics/participant/daily')
  .get(controller.dailyParticipants);

router
  .route('/analytics/participant/daily/present')
  .get(controller.dailyParticipantsPresent);

router
  .route('/analytics/participant/daily/absent')
  .get(controller.dailyParticipantsAbsent);

module.exports = router;
