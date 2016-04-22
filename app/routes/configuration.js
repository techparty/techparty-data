'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/configuration')
const auth = require('../services/auth');

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
