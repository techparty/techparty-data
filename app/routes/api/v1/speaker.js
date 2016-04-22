'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../../../controllers/api/v1/speaker');

router.post('/search', controller.search);

router.post('/get', controller.get);

module.exports = router;
