/*jslint node: true */

'use strict';

var errorService = require('../services/error');
var Model = require('../models/v1/speaker');

exports.renderIndex = function (req, res, next) {
    Model
        .find({})
        .sort('-year date')
        .select('name email talk date')
        .exec(function (err, speakers) {
            if (err) {
                return errorService.response(next, err);
            }
            
            return res.render('speaker/index', {
                speakers: speakers
            });
        });
};

exports.renderNew = function (req, res, next) {
    res.render('speaker/new');
};

exports.create = function (req, res) {
    var speaker = new Model(req.body);
    speaker.year = Number(speaker.date.replace(/.*\//, ''));
    
    speaker.save(function (err) {
        if (err) {
            return errorService.response(next, err);
        }

        return res.redirect('/speaker');
    });
};

exports.renderEdit = function (req, res, next) {
    Model.findById(req.params.id, function (err, speaker) {
        if (err) {
            return errorService.response(next, err);
        }

        if (!speaker) {
            return next();
        }

        return res.render('speaker/edit', {
            speaker: speaker
        });
    });
};

exports.update = function (req, res, next) {
    Model.findById(req.params.id, function (err, speaker) {
        if (err) {
            return errorService.response(next, err);
        }

        if (!speaker) {
            return next();
        }

        Model.update({ _id: req.params.id }, { $set : req.body }, function (err) {
            if (err) {
                return errorService.response(next, err);
            }

            return res.redirect('/speaker');
        });
    });
};

exports.delete = function (req, res, next) {
    var id = req.params.id;
    Model.findById(id, function (err, speaker) {
        if (err) {
            return errorService.response(next, err);
        }

        if (!speaker) {
            return next();
        }

        Model.remove({ _id: id }, function (err) {
            if (err) {
                return errorService.response(next, err);
            }

            return res.redirect('/speaker');
        });
    });
};