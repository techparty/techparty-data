/*jslint node: true */

'use strict';

var request = require('request');
var mongoose = require('../config/mongoose');
var async = require('async');
var UserModel = require('../app/models/v1/user');

var users = []

users.push({
    name: 'TechParty',
    username: 'myemail@email.com',
    password: 'pass'
});

UserModel.create(users, function (err) {
    if (err)
        return console.log('ERR: ', err);

    console.log('DONE');
})