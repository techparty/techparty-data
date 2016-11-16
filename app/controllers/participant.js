'use strict';

// modules
const moment = require('moment');
const async = require('async');

// services
const errorService = require('../services/error');

// models
const Model = require('../models/participant');

module.exports = {

    renderIndex : (req, res, next) => {
        let year = req.params.year || moment().get('year');
        async.parallel({
            years : cb => {
                Model
                    .distinct('year')
                    .then(years => {
                        cb(null, years.sort());
                    })
                    .catch(err => {
                        cb(err);
                    })
            },
            participants : cb => {
                Model
                    .find({ year: year })
                    .sort('-year name')
                    .then(participants => {
                        cb(null, participants);
                    })
                    .catch(err => {
                        cb(err);
                    })
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

    renderNew : (req, res, next) => {
        res.render('participant/new');
    },

    delete : (req, res, next) => {
        let id = req.params.id;
        Model
            .findById(id)
            .then(participant => {
                if (!participant) return next();

                Model.remove({ _id: id }, err => {
                    if (err) return errorService.response(next, err);
                    return res.redirect('/participant');
                });
            })
            .catch(err => {
                errorService.response(next, err)
            })
    }

};
