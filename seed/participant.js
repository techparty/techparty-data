/*jslint node: true */

'use strict';

var request = require('request');
var mongoose = require('../config/mongoose');
var ParticipantModel = require('../app/models/v1/participant');

request({
    uri: 'http://techparty.faccat.br/data.json',
    method: 'GET'
}, function (err, response, body) {
    if (err) throw err;

    var list = JSON.parse(body).participants;
    ParticipantModel.create(list, function (err) {
        if (err) return console.log(err);

        console.log('POPULATE OK');
    });

})