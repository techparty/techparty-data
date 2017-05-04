const express = require('express');
const controller = require('../../../controllers/api/v2/participant');

const router = express.Router();

router
  .route('/get')
  /**
  * @api {post} /participant/get Get participant
  * @apiGroup participant
  * @apiVersion 2.0.0
  *
  * @apiParam {String} name
  * @apiParam {String} cpf
  * @apiParam {Number} year
  *
  * @apiSuccess {Participant} participant
  */
  .post(controller.get);

module.exports = router;
