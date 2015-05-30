/*jslint node: true */

'use strict';

module.exports = function (app) {

    // enabling cors
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    // routes web
    var index = require('../app/routes/index');
    var auth = require('../app/routes/auth');

    app.use('/admin', index)
    app.use('/auth', auth);

    // routes api
    var healthcheck = require('../app/routes/api/healthcheck');
    var participant = require('../app/routes/api/participant');
    var speaker = require('../app/routes/api/speaker');

    app.use('/api/healthcheck', healthcheck);
    app.use('/api/participant', participant);
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
