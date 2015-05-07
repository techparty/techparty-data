/*jslint node: true */

'use strict';

module.exports = function (app) {

    var participant = require('../app/routes/participant');
    var healthcheck = require('../app/routes/healthcheck');
    var speaker = require('../app/routes/speaker');

    app.use('/api/participant', participant);
    app.use('/api/healthcheck', healthcheck);
    app.use('/api/speaker', speaker);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
          message: err.message,
          error: err
        });
      });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: {}
      });
    });

}
