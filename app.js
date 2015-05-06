/*jslint node: true */

'use strict';

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

if ('production' === process.env.NODE_ENV) {
    require('newrelic');
}

// config mongoose
var mongoose = require('./config/mongoose');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

// enabling cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./config/routes')(app);

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
    console.log(("Express server worker listening on port " + app.get('port')))
});

module.exports = app;
