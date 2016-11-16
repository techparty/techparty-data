'use strict';

// services
const errorService = require('../services/error');

// models
const Model = require('../models/speaker');

module.exports = {

    renderIndex : (req, res, next) => {
        Model
            .find({})
            .sort('-year date')
            .select('name email talk date')
            .then(speakers => {
                res.render('speaker/index', { speakers: speakers });
            })
            .catch(err => {
                errorService.response(next, err);
            });
    },

    renderNew : (req, res, next) => {
        res.render('speaker/new');
    },

    create : (req, res, next) => {
        var speaker = new Model(req.body);
        speaker.year = Number(req.body.date.replace(/\/.*/, ''));
        speaker
            .save()
            .then(() => {
                res.redirect('/speaker');
            })
            .catch(err => {
                errorService.response(next, err);
            });
    },

    renderEdit : (req, res, next) => {
        Model
            .findById(req.params.id)
            .then(speaker => {
                if (!speaker) return next();
                return res.render('speaker/edit', { speaker: speaker });
            })
            .catch(err => {
                errorService.response(next, err);
            });
    },

    update : (req, res, next) => {
        Model
            .findById(req.params.id)
            .then(speaker => {
                if (!speaker) return next();
                if (req.body.date) req.body.year = Number(req.body.date.replace(/\/.*/, ''));
                Model
                    .update({ _id: req.params.id }, { $set : req.body })
                    .then(() => {
                        res.redirect('/speaker');
                    })
                    .catch(err => {
                        errorService.response(next, err);
                    })
            })
            .catch(err => {
                errorService.response(next, err);
            });
    },

    delete : (req, res, next) => {
        var id = req.params.id;
        Model
            .findById(id)
            .then(speaker => {
                if (!speaker) return next();
                Model
                    .remove({ _id: id })
                    .then(() => {
                        return res.redirect('/speaker');
                    })
                    .catch(err => {
                        errorService.response(next, err);
                    });
            })
            .catch(err => {
                errorService.response(next, err);
            });
    }

};
