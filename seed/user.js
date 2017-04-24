require('../config/mongoose');

const log = require('winston');
const UserModel = require('../app/models/user');

const users = [];

users.push({
  name: 'TechParty',
  username: 'myemail@email.com',
  password: 'pass',
  isAdmin: false,
});

UserModel
  .create(users)
  .then(() => log.info('DONE'))
  .catch(err => log.error('ERR: ', err));
