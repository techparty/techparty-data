/*jslint node: true */

'use strict';

module.exports = function (app) {

    app.use(function (req, res, next) {
        // enabling cors
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        // is logged
        res.locals.isLogged = req.isAuthenticated();
        next();
    });

    // routes web
    var index = require('../app/routes/index');
    var auth = require('../app/routes/auth');
    var speaker = require('../app/routes/speaker');
    var participant = require('../app/routes/participant');
    var configuration = require('../app/routes/configuration');

    app.use('/', index)
    app.use('/auth', auth);
    app.use('/speaker', speaker);
    app.use('/participant', participant);
    app.use('/configuration', configuration);

    // routes api v1
    var healthcheck = require('../app/routes/api/v1/healthcheck');
    var participant = require('../app/routes/api/v1/participant');
    var speaker = require('../app/routes/api/v1/speaker');

    app.use('/api/v1/healthcheck', healthcheck);
    app.use('/api/v1/participant', participant);
    app.use('/api/v1/speaker', speaker);

    // routes api v2
    var participant = require('../app/routes/api/v2/participant');

    app.use('/api/v2/participant', participant);


    // catch 404 and forward to error handler
    app.use(function(error, req, res, next) {
        if (error) {
            return next(error);
        }
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });


    // error handlers
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: app.get('env') === 'development' ? err : {}
        });
    });
}
