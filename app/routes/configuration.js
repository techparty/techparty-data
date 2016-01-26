/*jslint node: true */

'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../controllers/configuration')
var auth = require('../services/auth');

router.use(auth.isAuthenticated)

router
    .route('/')
    .get(controller.renderIndex)
    .post(controller.create);

router
    .route('/new')
    .get(controller.renderNew);

router
    .route('/:id')
    .get(controller.renderEdit)
    .put(controller.update)
    .delete(controller.delete);

module.exports = router;
