/*jslint node: true */

'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../../controllers/api/participant');

router.post('/search', controller.search);

router.post('/get', controller.get);

module.exports = router;
