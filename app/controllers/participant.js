/*jslint node: true */

'use strict';

var errorService = require('../services/error');
var Model = require('../models/v1/participant');
var moment = require('moment');

exports.renderIndex = function (req, res, next) {
    var year = req.params.year || moment().get('year');
    Model
        .find({ year: year })
        .sort('-year created_at')
        .exec(function (err, participants) {
            if (err) {
                return errorService.response(next, err);
            }
            
            return res.render('participant/index', {
                participants: participants
            });
        });
};

exports.delete = function (req, res, next) {
    var id = req.params.id;
    Model.findById(id, function (err, participant) {
        if (err) {
            return errorService.response(next, err);
        }

        if (!participant) {
            return next();
        }

        Model.remove({ _id: id }, function (err) {
            if (err) {
                return errorService.response(next, err);
            }

            return res.redirect('/participant');
        });
    });
};