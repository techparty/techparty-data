/*jslint node: true */

'use strict';

var errorService = require('../services/error');
var Model = require('../models/v1/configuration');

exports.renderIndex = function (req, res, next) {
    Model
        .find({})
        .sort('-name')
        .exec(function (err, settings) {
            if (err) {
                return errorService.response(next, err);
            }
            
            return res.render('configuration/index', {
                settings: settings
            });
        });
};

exports.renderNew = function (req, res, next) {
    res.render('configuration/new');
};

exports.create = function (req, res) {
    var configuration = new Model(req.body);
    configuration.save(function (err) {
        if (err) {
            return errorService.response(next, err);
        }

        return res.redirect('/configuration');
    });
};

exports.renderEdit = function (req, res, next) {
    Model.findById(req.params.id, function (err, configuration) {
        if (err) {
            return errorService.response(next, err);
        }

        if (!configuration) {
            return next();
        }

        return res.render('configuration/edit', {
            configuration: configuration
        });
    });
};

exports.update = function (req, res, next) {
    Model.findById(req.params.id, function (err, configuration) {
        if (err) {
            return errorService.response(next, err);
        }

        if (!configuration) {
            return next();
        }

        delete req.body._id;
        Model.update({ _id: req.params.id }, { $set : req.body }, function (err) {
            if (err) {
                return errorService.response(next, err);
            }

            return res.redirect('/configuration');
        });
    });
};

exports.delete = function (req, res, next) {
    var id = req.params.id;
    Model.findById(id, function (err, configuration) {
        if (err) {
            return errorService.response(next, err);
        }

        if (!configuration) {
            return next();
        }

        Model.remove({ _id: id }, function (err) {
            if (err) {
                return errorService.response(next, err);
            }

            return res.redirect('/configuration');
        });
    });
};