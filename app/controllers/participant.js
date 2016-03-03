/*jslint node: true */

'use strict';

var errorService = require('../services/error');
var Model = require('../models/v1/participant');
var moment = require('moment');
var async = require('async');

exports.renderIndex = function (req, res, next) {
    var year = req.params.year || moment().get('year');
    async.parallel({
        years : function (cb) {
            Model.distinct('year', function (err, years) {
                if (err) { return cb(); }
                return cb(null, years.sort());
            });
        },
        participants : function (cb) {
            Model
                .find({ year: year })
                .sort('-year name')
                .exec(function (err, participants) {
                    if (err) { return cb(err);}
                    return cb(null, participants);
                });
        }
    }, function (err, result) {
        if (err) {
            return errorService.response(next, err);
        }
        
        return res.render('participant/index', {
            participants: result.participants,
            years: result.years,
            year: year
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