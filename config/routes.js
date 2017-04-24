module.exports = (app) => {
  app.use((req, res, next) => {
    // enabling cors
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    // is logged
    res.locals.isLogged = req.isAuthenticated();

    // get user
    res.locals.user = req.user;
    next();
  });

  // routes web
  app.use('/', require('../app/routes/index'));
  app.use('/auth', require('../app/routes/auth'));
  app.use('/speaker', require('../app/routes/speaker'));
  app.use('/participant', require('../app/routes/participant'));
  app.use('/configuration', require('../app/routes/configuration'));
  app.use('/user', require('../app/routes/user'));

  // routes api v1
  app.use('/api/v1/healthcheck', require('../app/routes/api/v1/healthcheck'));
  app.use('/api/v1/participant', require('../app/routes/api/v1/participant'));
  app.use('/api/v1/speaker', require('../app/routes/api/v1/speaker'));

  // routes api v2
  app.use('/api/v2/participant', require('../app/routes/api/v2/participant'));
  app.use('/api/v2/speaker', require('../app/routes/api/v2/speaker'));

  // catch 404 and forward to error handler
  app.use((error, req, res, next) => {
    if (error) return next(error);
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers
  app.use((err, req, res, next) => {
    if (!next) return;
    res.status(err.status || res.statusCode || 500);
    err.status = res.statusCode;
    const body = {
      message: err.message,
      error: err,
    };
    if (req.xhr) return res.json(body);
    res.render('error', body);
  });
};
