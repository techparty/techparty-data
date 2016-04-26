'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/participant')
const auth = require('../services/auth');

router.get('/', auth.isAuthenticated, controller.renderIndex);

router.get('/new', auth.isAuthenticated, controller.renderNew);

router.get('/:year', auth.isAuthenticated, controller.renderIndex);

router.delete('/:id', auth.isAuthenticated, controller.delete);

module.exports = router;
