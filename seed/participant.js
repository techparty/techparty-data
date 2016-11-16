'use strict';

const request = require('request');
const moment = require('moment');
const log = require('winston');
const mongoose = require('../config/mongoose');
const Model = require('../app/models/participant');

request({
    uri: 'http://techparty.faccat.br/participant.json',
    method: 'GET',
    json: true
}, (err, response, body) => {
    if (err) throw err;

    let participants = body.participants;

    let years = {};

    participants.forEach(participant => {
        let year = participant.year;
        let name = participant.name;

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
            for (let i = 0, l = 5; i < l; i++) {
                if (!years[year][name].days[i].present) {
                    years[year][name].days[i].present = true;
                    break;
                }
            }
        }
    });

    for (let year in years) {
        for (let name in years[year]) {
            Model.create(years[year][name], err => {
                if (err) log.error(err);
            });
        }
    }

})
