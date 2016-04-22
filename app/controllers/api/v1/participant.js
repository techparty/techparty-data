'use strict';

const moment = require('moment');
const async = require('async');

const ParticipantModel = require('../../../models/v1/participant');
const ConfigurationModel = require('../../../models/v1/configuration');

let _create = (data, cb) => {
    let participant = new ParticipantModel();
    participant.name = data.name;
    participant.email = data.email;
    participant.cpf = data.cpf;
    participant.year = data.year;
    participant.days = [];
    data.days.forEach((day) => { participant.days.push({ name: day }); });
    participant.save(cb);
};

let _update = (data, cb) => {
    let update = {
        name: data.name,
        cpf: data.cpf,
        days: []
    };
    data.days.forEach((day) => { update.days.push({ name: day }); });
    ParticipantModel.update({ email: data.email, year: data.year }, { $set: update }, cb);
};

module.exports = {

    search : (req, res) => {
        let query = new RegExp(req.body.username, 'i');
        let year = req.body.year || new Date().getFullYear();
        ParticipantModel
            .find({ name: { $regex: query }, year: year })
            .select('name')
            .lean()
            .exec((err, participants) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json(participants);
            });
    },

    get : (req, res) => {
        ParticipantModel
            .findOne({ _id : req.body.id })
            .select('-_id')
            .lean()
            .exec((err, participant) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json(participant)
            });
    },

    create : (req, res) => {
        req.body.year = Number(req.body.year || moment().get('year'));
        req.body.days = !req.body.days ? [] : Array.isArray(req.body.days) ? req.body.days : req.body.days.split(',');

        ParticipantModel.findOne({ email: req.body.email, year: req.body.year }, (err, exist) => {
            if (err) return res.status(500).json(err);

            async.each(req.body.days, (day, cb) => {
                if (!!exist && !!exist.days.filter(d => { return Number(d.name) === Number(day) })[0]) return cb();
                let param = 'max-year-' + req.body.year + '-day-' + day;
                ConfigurationModel.findOne({ name : param }, function (err, configuration) {
                    if (err) return cb(err);

                    if (!configuration) return cb();

                    ParticipantModel.count({ year: req.body.year, 'days.name': day }, function (err, count) {
                        if (err) return cb(err);

                        if (count >= configuration.value) return cb('Maximum number of participants reached on day ' + day);

                        cb();
                    });
                });
            }, err => {
                if (err) return res.status(400).json(err);

                let _response = err => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).end();
                };

                if (exist) return _update(req.body, _response);
                return _create(req.body, _response);
            });
        });
    }

};
