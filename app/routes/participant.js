const express = require('express');
const controller = require('../controllers/participant');
const AuthService = require('../services/auth');

const router = express.Router();

router
  .route('/')
  .get(AuthService.isAuthenticated(), controller.renderIndex);

router
  .route('/new')
  .get(AuthService.isAuthenticated(), controller.renderNew);

router
  .route('/:year')
  .get(AuthService.isAuthenticated(), controller.renderIndex);

router
  .route('/:id')
  .delete(AuthService.isAuthenticated(), controller.delete);

module.exports = router;
