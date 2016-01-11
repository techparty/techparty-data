/*jslint node: true */

'use strict';

var async = require('async');
var ParticipantModel = require('../../../models/v1/participant');
var moment = require('moment');

exports.search = function (req, res, next) {
    var query = new RegExp(req.body.username, 'i');
    var year = req.body.year || new Date().getFullYear();
    ParticipantModel
        .find({ name: { $regex: query }, year: year })
        .select('name')
        .lean()
        .exec(function (err, participants) {
            if (err) {
                return res.status(500).json(err);
            }

            return res.status(200).json(participants);
        });
}

exports.get = function (req, res, next) {
    ParticipantModel
        .findOne({ _id : req.body.id })
        .select('-_id')
        .lean()
        .exec(function (err, participant) {
            if (err) {
                return res.status(500).json(err);
            }

            return res.status(200).json(participant)
        });
}

exports.create = function (req, res) {
    var participant = new ParticipantModel();

    participant.name = req.body.name;
    participant.email = req.body.email;
    participant.cpf = req.body.cpf;
    participant.year = req.body.year || moment().get('year');

    participant.days = [];
    var days = !req.body.days ? [] : Array.isArray(req.body.days) ? req.body.days : req.body.days.split(',');
    days.forEach(function (day) { participant.days.push({ name: day }); });

    participant.save(function (err) {
        if (err) {
            return res.status(500).json(err);
        }

        return res.status(200).end();
    });
};