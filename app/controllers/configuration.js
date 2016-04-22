'use strict';

// services
const errorService = require('../services/error');

// models
const Model = require('../models/v1/configuration');

module.exports = {

    renderIndex : (req, res, next) => {
        Model
            .find({})
            .sort('-name')
            .exec((err, settings) => {
                if (err) return errorService.response(next, err);
                
                return res.render('configuration/index', {
                    settings: settings
                });
            });
    },

    renderNew : (req, res, next) => {
        res.render('configuration/new');
    },

    create : (req, res) => {
        let configuration = new Model(req.body);
        configuration.save(err => {
            if (err) return errorService.response(next, err);
            return res.redirect('/configuration');
        });
    },

    renderEdit : (req, res, next) => {
        Model.findById(req.params.id, (err, configuration) => {
            if (err) return errorService.response(next, err);

            if (!configuration) return next();

            return res.render('configuration/edit', {
                configuration: configuration
            });
        });
    },

    update : (req, res, next) => {
        Model.findById(req.params.id, (err, configuration) => {
            if (err) return errorService.response(next, err);

            if (!configuration) return next();

            delete req.body._id;
            Model.update({ _id: req.params.id }, { $set : req.body }, err => {
                if (err) return errorService.response(next, err);
                return res.redirect('/configuration');
            });
        });
    },

    delete : (req, res, next) => {
        let id = req.params.id;
        Model.findById(id, (err, configuration) => {
            if (err) return errorService.response(next, err);

            if (!configuration) return next();

            Model.remove({ _id: id }, err => {
                if (err) return errorService.response(next, err);
                return res.redirect('/configuration');
            });
        });
    }

};