const express = require('express');
const controller = require('../../../controllers/api/v1/healthcheck');

const router = express.Router();

router
  .route('/')
  .get(controller.index);

module.exports = router;
