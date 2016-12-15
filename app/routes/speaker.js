const express = require('express');
const controller = require('../controllers/speaker');
const AuthService = require('../services/auth');

const router = express.Router();

router
  .route('/')
  .all(AuthService.isAuthenticated())
  .get(controller.renderIndex)
  .post(controller.create);

router
  .route('/new')
  .get(AuthService.isAuthenticated(), controller.renderNew);

router
  .route('/:id')
  .all(AuthService.isAuthenticated())
  .get(controller.renderEdit)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
