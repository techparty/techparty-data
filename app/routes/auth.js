const express = require('express');
const controller = require('../controllers/auth');
const passport = require('passport');
const AuthService = require('../services/auth');

const router = express.Router();

router
  .route('/signin')
  .get(controller.renderSignIn)
  .post(passport.authenticate('local'), controller.signIn);

router
  .route('/signout')
  .get(AuthService.isAuthenticated, controller.signOut)

router
  .route('/reset')
  .get(controller.renderReset)
  .post(controller.reset);

module.exports = router;
