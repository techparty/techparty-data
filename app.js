const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const helmet = require('helmet');
const log = require('winston');
const env = require('./config/env');

if (env.node_env === 'production') require('newrelic');

// config mongoose
const mongoose = require('./config/mongoose');

// config passport
const passport = require('./config/passport');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');
app.locals.moment = require('moment');

app.disable('x-powered-by');
app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

const { secret } = env;

app.use(cookieParser(secret));
app.use(session({
  secret,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  saveUninitialized: true,
  resave: false,
}));

app.use(express.static(path.join(__dirname, 'app/public')));
app.use('/doc', express.static(path.join(__dirname, 'doc')));

app.use(passport.initialize());
app.use(passport.session());

require('./config/routes')(app);

app.set('port', env.port);

const server = app.listen(app.get('port'), () => {
  log.info(`Express server worker listening on port ${app.get('port')}`);
});

require('./config/io')(server);

module.exports = app;
