const express = require('express');
const controller = require('../../../controllers/api/v1/speaker');

const router = express.Router();

router
  .route('/search')
  .post(controller.search);

router
  .route('/get')
  .post(controller.get);

module.exports = router;
