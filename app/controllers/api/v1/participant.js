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
    data.days.forEach(function (day) { participant.days.push({ name: day }); });

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
    req.body.year = Number(req.body.year || moment().get('year'));
    req.body.days = !req.body.days ? [] : Array.isArray(req.body.days) ? req.body.days : req.body.days.split(',');

    ParticipantModel.findOne({ cpf: String(req.body.cpf), year: req.body.year }, function (err, exist) {
        if (err) {
            return res.status(500).json(err);
        }
        if (exist) {
            return res.status(400).json({ message: 'Existing participant' });
        }

        async.eachSeries(req.body.days, function (day, cb) {
            var param = 'max-year-' + req.body.year + '-day-' + day;
            ConfigurationModel.findOne({ name : param }, function (err, configuration) {
                if (err) {
                    return cb(err)
                }
                if (!configuration) {
                    return cb();
                }
                ParticipantModel.count({ year: req.body.year, 'days.name': day }, function (err, count) {
                    if (err) {
                       return cb(err);
                    }
                    if (count >= configuration.value) {
                        return cb('Maximum number of participants reached on day ' + day);
                    }
                    cb();
                });
            });
        }, function (err) {
            if (err) {
                return res.status(400).json(err);
            }
            _create(req.body, function (err, participant) {
                if (err) {
                    return res.status(500).json(err);
                }
                return res.status(200).end();
            });
        });
    });
};