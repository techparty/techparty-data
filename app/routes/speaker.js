const express = require('express');
const controller = require('../controllers/speaker')
const AuthService = require('../services/auth');

const router = express.Router();

router.use(AuthService.isAuthenticated);

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
