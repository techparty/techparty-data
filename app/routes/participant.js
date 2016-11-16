const express = require('express');
const controller = require('../controllers/participant')
const AuthService = require('../services/auth');

const router = express.Router();

router.use(AuthService.isAuthenticated);

router
  .route('/')
  .get(controller.renderIndex);

router
  .route('/new')
  .get(controller.renderNew);

router
  .route('/:year')
  .get(controller.renderIndex);

router
  .route('/:id')
  .delete(controller.delete);

module.exports = router;
