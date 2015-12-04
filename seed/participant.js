/*jslint node: true */

'use strict';

var request = require('request');
var moment = require('moment');
var mongoose = require('../config/mongoose');
var ParticipantModel = require('../app/models/v1/participant');

request({
    uri: 'http://techparty.faccat.br/participant-2015.json',
    method: 'GET',
    json: true
}, function (err, response, body) {
    if (err) throw err;

    var participants = body.participants;

    var years = {};

    participants.forEach(function (participant) {
        var year = participant.year;
        var name = participant.name;

        if (!years[year]) {
            years[year] = {};
        }

        if (!years[year][name]) {
            participant.days = [
                { name: 1, present: true },
                { name: 2, present: false },
                { name: 3, present: false },
                { name: 4, present: false },
                { name: 5, present: false }
            ];
            years[year][name] = participant;
        } else {
            for (var i = 0, l = 5; i < l; i++) {
                if (!years[year][name].days[i].present) {
                    years[year][name].days[i].present = true;
                    break;
                }
            }
        }
    });

    for (var year in years) {
        for (var name in years[year]) {
            ParticipantModel.create(years[year][name], function (err) {
                if (err) console.log(err);
            });
        }
    }

})