/*jslint node: true */

'use strict';

var SpeakerModel = require('../../models/speaker');

exports.search = function (req, res, next) {
    var query = new RegExp(req.body.username, 'i');
    var year = req.body.year || new Date().getFullYear();
    SpeakerModel
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

    SpeakerModel
        .findOne(query)
        .select('-_id')
        .lean()
        .exec(function (err, speaker) {
            if (err)
                return res.status(500).json(err);

            return res.status(200).json(speaker)
        });
}