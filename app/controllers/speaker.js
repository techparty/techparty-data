'use strict';

// services
const errorService = require('../services/error');

// models
const Model = require('../models/v1/speaker');

module.exports = {

    renderIndex : (req, res, next) => {
        Model
            .find({})
            .sort('-year date')
            .select('name email talk date')
            .exec((err, speakers) => {
                if (err) return errorService.response(next, err);
                
                return res.render('speaker/index', {
                    speakers: speakers
                });
            });
    },

    renderNew : (req, res, next) => {
        res.render('speaker/new');
    },

    create : (req, res) => {
        var speaker = new Model(req.body);
        speaker.year = Number(speaker.date.replace(/.*\//, ''));
        
        speaker.save(err => {
            if (err) return errorService.response(next, err);
            return res.redirect('/speaker');
        });
    },

    renderEdit : (req, res, next) => {
        Model.findById(req.params.id, (err, speaker) => {
            if (err) return errorService.response(next, err);

            if (!speaker) return next();

            return res.render('speaker/edit', {
                speaker: speaker
            });
        });
    },

    update : (req, res, next) => {
        Model.findById(req.params.id, (err, speaker) => {
            if (err) return errorService.response(next, err);

            if (!speaker) return next();

            Model.update({ _id: req.params.id }, { $set : req.body }, err => {
                if (err) return errorService.response(next, err);
                return res.redirect('/speaker');
            });
        });
    },

    delete : (req, res, next) => {
        var id = req.params.id;
        Model.findById(id, (err, speaker) => {
            if (err) return errorService.response(next, err);

            if (!speaker) return next();

            Model.remove({ _id: id }, err => {
                if (err) return errorService.response(next, err);
                return res.redirect('/speaker');
            });
        });
    }

};