'use strict';

const Model = require('../../../models/v1/speaker');

module.exports = {

    search : (req, res, next) => {
        var query = new RegExp(req.body.username, 'i');
        var year = req.body.year || new Date().getFullYear();
        Model
            .find({ name: { $regex: query }, year: year })
            .select('name')
            .lean()
            .exec(function (err, speakers) {
                if (err) return res.status(500).json(err);
                return res.status(200).json(speakers);
            });
    },

    get : (req, res, next) => {
        Model
            .findOne({ _id : req.body.id })
            .select('-_id')
            .lean()
            .exec(function (err, speaker) {
                if (err) return res.status(500).json(err);
                return res.status(200).json(speaker)
            });
    }

};