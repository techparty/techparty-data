const express = require('express');
const controller = require('../../../controllers/api/v2/speaker');

const router = express.Router();

router
  .route('/get')
  .post(controller.get);

module.exports = router;
