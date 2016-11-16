const express = require('express');
const controller = require('../../../controllers/api/v1/participant');

const router = express.Router();

router
  .route('/')
  .post(controller.create);

router
  .route('/search')
  .post(controller.search);

router
  .route('/get')
  .post(controller.get);

module.exports = router;
