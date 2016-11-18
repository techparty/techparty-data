const express = require('express');
const controller = require('../../../controllers/api/v1/participant');

const router = express.Router();

router
  .route('/')
  /**
  * @api {post} /participant Create or Update
  * @apiGroup participant
  * @apiVersion 1.0.0
  *
  * @apiParam {String} name
  * @apiParam {String} email
  * @apiParam {String} cpf
  * @apiParam {Number} year=current
  * @apiParam {String} days
  *
  * @apiSuccess {Boolean} success=true
  */
  .post(controller.create);

router
  .route('/search')
  /**
  * @api {post} /participant/search Search
  * @apiGroup participant
  * @apiVersion 1.0.0
  *
  * @apiParam {String} name
  * @apiParam {String} year=current
  *
  * @apiSuccess {Participant[]} participants
  */
  .post(controller.search);

router
  .route('/get')
  /**
  * @api {post} /participant/get Get participant
  * @apiGroup participant
  * @apiVersion 1.0.0
  *
  * @apiParam {String} id
  *
  * @apiSuccess {Participant} participant
  */
  .post(controller.get);

module.exports = router;
