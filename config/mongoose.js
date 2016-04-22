'use strict';

// Bring Mongoose into the app
const mongoose = require('mongoose');
const log = require('winston');

// Build the connection string
const dbURI = process.env.TECHPARTY_MONGODB;

if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
}

// Create the database connection
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  log.info(`Mongoose default connection open to ${dbURI}`);
});

// If the connection throws an error
mongoose.connection.on('error', err => {
  log.error(`Mongoose default connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  log.info('Mongoose default connection disconnected');
});

// When the connection is open
mongoose.connection.once('open', () => {
  log.info('Mongoose default connection is open')
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    log.error('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

module.exports = mongoose;
