'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/speaker')
const auth = require('../services/auth');

router
    .get('/', auth.isAuthenticated, controller.renderIndex)
    .post('/', auth.isAuthenticated, controller.create);

router.get('/new', auth.isAuthenticated, controller.renderNew);

router
    .get('/:id', auth.isAuthenticated, controller.renderEdit)
    .put('/:id', auth.isAuthenticated, controller.update)
    .delete('/:id', auth.isAuthenticated, controller.delete);

module.exports = router;
