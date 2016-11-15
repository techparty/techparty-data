const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');
const passport = require('passport');
const auth = require('../services/auth');

router
  .route('/signin')
  .get(controller.renderSignIn)
  .post(passport.authenticate('local'), controller.signIn);

router
  .route('/signout')
  .get(auth.isAuthenticated, controller.signOut)

router
  .route('/reset')
  .get(controller.renderReset)
  .post(controller.reset);

module.exports = router;
