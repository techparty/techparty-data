const log = require('winston');

module.exports = {

  response: (next, err) => {
    if (err.name !== 'ValidationError') {
      log.error('Internal error (500): ', err);
      const error = new Error('Server error');
      error.status = 500;
      return next(error);
    }

    const errors = [];

    Object.keys(err.errors).forEach((key) => {
      errors.push(err.errors[key].message);
    });

    log.error('Internal error (400): ', err);
    const error = new Error(errors.join('<br>'));
    error.status = 400;
    return next(error);
  },

};
