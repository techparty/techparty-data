/*jslint node: true */

'use strict';

var ParticipantModel = require('../models/participant');

exports.list = function (req, res, next) {
    var year = req.params.year || new Date().getFullYear();   
    ParticipantModel
        .find({
            year: year
        })
        .lean()
        .exec(function (err, participants) {
            if (err)
                return res.status(500).json(error);

            return res.status(200).json(participants)
        })
}