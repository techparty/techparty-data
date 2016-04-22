'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../../../controllers/api/v2/participant');

router
    .route('/get')
    .post(controller.get);

module.exports = router;
