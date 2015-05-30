/*jslint node: true */

'use strict';

var async = require('async');
var ParticipantModel = require('../../models/participant');

exports.search = function (req, res, next) {
    var query = new RegExp(req.body.username, 'i');
    var year = req.body.year || new Date().getFullYear();
    ParticipantModel
        .distinct('name', { name: { $regex: query }, year: year })
        .lean()
        .exec(function (err, participants) {
            if (err)
                return res.status(500).json(err);

            return res.status(200).json(participants);
        });
}

exports.get = function (req, res, next) {
    var name = req.body.username
    var year = req.body.year || new Date().getFullYear();
    var query = { year: year, name: name };

    async.parallel({
        count : function (cb) {
            ParticipantModel
                .count(query)
                .lean()
                .exec(function (err, count) {
                    if (err)
                        return cb(err);

                    return cb(null, count)
                })
        },
        participant : function (cb) {
            ParticipantModel
                .findOne(query)
                .select('name -_id')
                .lean()
                .exec(function (err, participant) {
                    if (err)
                        return cb(err);

                    return cb(null, participant)
                })
        }
    }, function (err, results) {
        if (err)
            return res.status(500).json(err);

        var participant = results.participant;
        participant.count = results.count;
        return res.status(200).json(participant)
    })
}