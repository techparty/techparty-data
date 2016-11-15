const mongoose = require('mongoose');
const log = require('winston');
const env = require('./env');

// Build the connection string
const dbURI = env.mongodb;

mongoose.set('debug', env.node_env !== 'production');

mongoose.connect(dbURI);

mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => log.info(`Mongoose default connection open to ${dbURI}`));

mongoose.connection.on('error', err => log.error(`Mongoose default connection error: ${err}`));

mongoose.connection.on('disconnected', () => log.info('Mongoose default connection disconnected'));

mongoose.connection.once('open', () => log.info('Mongoose default connection is open'));

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    log.error('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

module.exports = mongoose;
