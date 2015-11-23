/*jslint node: true */

'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../controllers/speaker')
var auth = require('../services/auth');

router
    .get('/', auth.isAuthenticated, controller.renderIndex)
    .post('/', auth.isAuthenticated, controller.create);

router.get('/new', auth.isAuthenticated, controller.renderNew);

router
    .get('/:id', auth.isAuthenticated, controller.renderEdit)
    .put('/:id', auth.isAuthenticated, controller.update)
    .delete('/:id', auth.isAuthenticated, controller.delete);

module.exports = router;
