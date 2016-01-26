/*jslint node: true */

'use strict';

var moment = require('moment');
var async = require('async');

var ParticipantModel = require('../../../models/v1/participant');
var ConfigurationModel = require('../../../models/v1/configuration');

var _create = function (data, cb) {
    var participant = new ParticipantModel();

    participant.name = data.name;
    participant.email = data.email;
    participant.cpf = data.cpf;
    participant.year = data.year;

    participant.days = [];
    var days = !data.days ? [] : Array.isArray(data.days) ? data.days : data.days.split(',');
    days.forEach(function (day) { participant.days.push({ name: day }); });

    participant.save(function (err) {
        if (err) {
            return cb(err);
        }
        return cb(null, participant);
    });
};

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
    req.body.year = req.body.year || moment().get('year');
    var param = 'max-year-' + req.body.year;

    ParticipantModel.findOne({ cpf: req.body.cpf, year: req.body.year }, function (err, participant) {
        if (err) {
            return res.status(500).json(err);
        }

        if (participant) {
            return res.status(400).json({ message: 'Existing participant' });
        }

        ConfigurationModel.findOne({ name : param }, function (err, configuration) {
            if (err) {
                return res.status(500).json(err);
            }

            if (!configuration) {
                return _create(req.body, function (err, participant) {
                    if (err) {
                        return res.status(500).json(err);
                    }

                    return res.status(200).end();
                });
            }

            ParticipantModel.count({ year: req.body.year }, function (err, count) {
                if (err) {
                    return res.status(500).json(err);
                }

                if (count >= configuration.value) {
                    return res.status(400).json({ message: 'Maximum number of participants reached' });
                }

                _create(req.body, function (err, participant) {
                    if (err) {
                        return res.status(500).json(err);
                    }

                    return res.status(200).end();
                });
            });
        });
    });
};