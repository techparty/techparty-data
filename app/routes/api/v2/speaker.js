const express = require('express');
const controller = require('../../../controllers/api/v2/speaker');

const router = express.Router();

router
  .route('/get')
  /**
  * @api {post} /speaker/get Get speaker
  * @apiGroup speaker
  * @apiVersion 2.0.0
  *
  * @apiParam {String} email
  *
  * @apiSuccess {Speaker} speaker
  */
  .post(controller.get);

module.exports = router;
