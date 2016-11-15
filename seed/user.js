const request = require('request');
const async = require('async');
const log = require('winston');
const mongoose = require('../config/mongoose');
const UserModel = require('../app/models/v1/user');

const users = []

users.push({
  name: 'TechParty',
  username: 'myemail@email.com',
  password: 'pass'
});

UserModel.create(users, err => {
  if (err) return log.error('ERR: ', err);
  log.info('DONE');
})
