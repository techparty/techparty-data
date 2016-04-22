'use strict';

// modules
const moment = require('moment');
const async = require('async');

// services
const errorService = require('../services/error');

// models
const Model = require('../models/v1/participant');

module.exports = {

    renderIndex : (req, res, next) => {
        let year = req.params.year || moment().get('year');
        async.parallel({
            years : cb => {
                Model.distinct('year', (err, years) => {
                    if (err) return cb();
                    return cb(null, years.sort());
                });
            },
            participants : cb => {
                Model
                    .find({ year: year })
                    .sort('-year name')
                    .exec((err, participants) => {
                        if (err) return cb(err);
                        return cb(null, participants);
                    });
            }
        }, (err, result) => {
            if (err) return errorService.response(next, err);
            
            return res.render('participant/index', {
                participants: result.participants,
                years: result.years,
                year: year
            });
        });
    },

    delete : (req, res, next) => {
        let id = req.params.id;
        Model.findById(id, (err, participant) => {
            if (err) return errorService.response(next, err);

            if (!participant) return next();

            Model.remove({ _id: id }, err => {
                if (err) return errorService.response(next, err);
                return res.redirect('/participant');
            });
        });
    }

};