const express = require('express');
const controller = require('../../../controllers/api/v1/healthcheck');

const router = express.Router();

router
  .route('/')
  /**
  * @api {get} /healthcheck Health check
  * @apiGroup healthcheck
  * @apiVersion 1.0.0
  *
  * @apiSuccess {Boolean} success=true
  */
  .get(controller.index);

module.exports = router;
