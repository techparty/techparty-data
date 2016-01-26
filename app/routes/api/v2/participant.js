/*jslint node: true */

'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../../../controllers/api/v2/participant');

router
    .route('/get')
    .post(controller.get);

module.exports = router;
