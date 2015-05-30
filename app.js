/*jslint node: true */

'use strict';

var path = require('path');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

if ('production' === process.env.NODE_ENV) {
    require('newrelic');
}

// config mongoose
var mongoose = require('./config/mongoose');

// config passport
var passport = require('./config/passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

var secret = 'keyboard cat';

app.use(cookieParser(secret));
app.use(session({
    secret: secret,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    }),
    saveUninitialized: true,
    resave: false
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

require('./config/routes')(app);

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
    console.log(("Express server worker listening on port " + app.get('port')))
});

module.exports = app;
