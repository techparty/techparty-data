const nodemailer = require('nodemailer');
const env = require('../../config/env');
const UserModel = require('../models/user');

const sendMail = (emailTo, resetSecret) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: env.email_user, pass: env.email_password },
    });

    const mailOptions = {
      from: `${env.email_name} <${env.email_user}>`,
      to: emailTo,
      subject: 'TechParty Faccat - Reset password',
      html: `
        <p>Your secret key to reset password:</p>
        <b>${resetSecret}</b>
      `,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) return reject(error);
      resolve();
    });
  });
};

const crypto = require('crypto');

module.exports = {

  renderSignIn: (req, res) => {
    res.render('auth/signin');
  },

  signIn: (req, res) => {
    res.redirect('/');
  },

  signOut: (req, res) => {
    req.logout();
    res.redirect('/auth/signin');
  },

  renderReset: (req, res, next) => {
    const { email } = req.query;
    if (!email) return next(`Email ${email} invalid`);

    const secret = crypto.randomBytes(32).toString('base64');
    req.session.reset_secret = { email, secret };
    sendMail(email, secret)
      .then(() => res.render('auth/reset'))
      .catch(next);
  },

  reset: (req, res, next) => {
    const { reset_secret } = req.session;
    if (reset_secret.secret !== req.body.reset_secret) return next('Reset secret invalid');

    const { email } = req.body;
    if (reset_secret.email !== email) return next(`Email ${email} invalid`);

    UserModel
      .findOne({ username: email })
      .then((user) => {
        if (!user) return next('User not found');
        user.password = req.body.password;
        user
          .save()
          .then(() => res.redirect('/'))
          .catch(next);
      })
      .catch(next);
  },

};
