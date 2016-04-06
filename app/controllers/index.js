/*jslint node: true */

'use strict';

// modules
var async = require('async');

// models
var Model = require('../models/v1/participant');

exports.renderIndex = function (req, res, next) {
    return res.render('index');
};

var _getYears = function (cb) {
    Model.distinct('year', function (err, years) {
        if (err) return cb(err);
        return cb(null, years.sort());
    });
};

var _getDailyParticipantCount = function (present, callback) {
    if (typeof present === 'function') {
        callback = present;
        present = null;
    }
    _getYears(function (err, years) {
        var result = [];
        async.each(years, function (year, cbYear) {
            var values = [];
            var query = { year: year };
            async.each([1, 2, 3, 4, 5], function (day, cbDay) {
                query['days.name'] = day;
                Model
                    .find(query)
                    .exec(function (err, data) {
                        if (err) return cbDay(err);
                        if (present === null) {
                            values.push({ label: day, value: data.length });
                            return cbDay();
                        }
                        var value = 0;
                        data.forEach(function (participant) {
                            participant.days.forEach(function (d) {
                                if (d.name === day && d.present === present) {
                                    value += 1;
                                }
                            });
                        });
                        values.push({ label: day, value: value });
                        cbDay();
                    });
            }, function (err) {
                if (err) cbYear(err);
                result.push({ key: year, values: values.sort(function (a, b) { return a.label > b.label }) });
                return cbYear();
            });
        }, function (err) {
            if (err) callback(err);
            return callback(null, result.sort(function (a, b) { return a.key > b.key }));
        });
    });
};

exports.yearlyParticipants = function (req, res, next) {
    _getYears(function (err, years) {
        var values = [];
        async.eachSeries(years, function (year, cb) {
            var query = { year: year };
            Model.count(query, function (err, count) {
                if (err) return cb(err);
                values.push({ label: year, value: count });
                cb();
            });
        }, function (err) {
            if (err) return res.status(500).json(err);
            return res.status(200).json(values);
        });
    });
};

exports.dailyParticipants = function (req, res, next) {
    _getDailyParticipantCount(function (err, data) {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

exports.dailyParticipantsPresent = function (req, res, next) {
    _getDailyParticipantCount(true, function (err, data) {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

exports.dailyParticipantsAbsent = function (req, res, next) {
    _getDailyParticipantCount(false, function (err, data) {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};
