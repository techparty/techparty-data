const express = require('express');
const controller = require('../../../controllers/api/v1/speaker');

const router = express.Router();

router
  .route('/search')
  /**
  * @api {post} /speaker/search Search speakers
  * @apiGroup speaker
  * @apiVersion 1.0.0
  *
  * @apiParam {String} name
  * @apiParam {Number} year=current
  *
  * @apiSuccess {Speaker[]} speakers
  */
  .post(controller.search);

router
  .route('/get')
  /**
  * @api {post} /speaker/get Get speaker
  * @apiGroup speaker
  * @apiVersion 1.0.0
  *
  * @apiParam {String} id
  *
  * @apiSuccess {Speaker} speaker
  */
  .post(controller.get);

module.exports = router;
