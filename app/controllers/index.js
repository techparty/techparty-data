/*jslint node: true */

'use strict';

// modules
var async = require('async');

// models
var Model = require('../models/v1/participant');

exports.renderIndex = function (req, res, next) {
    return res.render('index');
};

var _findByYear = function (year, cb) {
    Model.find({ year: year }, cb);
};

var _findByYearAndDay = function (year, day, cb) {
    Model.find({ year: year, 'days.name': day }, cb);
};

var _getYears = function (cb) {
    Model.distinct('year', function (err, years) {
        if (err) return cb(err);
        return cb(null, years.sort());
    });
};

var _yearlyRegistration = function (years, result, callback) {
    var values = [];
    async.each(years, function (year, cb) {
        _findByYear(year, function (err, participants) {
            if (err) return cb(err);
            var count = 0;
            async.each(participants, function (participant, cbParticipant) {
                count += participant.days.length;
                cbParticipant();
            }, function () {
                values.push({ label: year, value: count });
                cb();
            });
        });
    }, function (err) {
        if (err) return callback(err);
        result.push({ key: 'Registration', values: values.sort(function (a, b) { return a.label > b.label }) })
        return callback();
    });
};

var _yearlyRegistrationPresent = function (years, result, callback) {
    var values = [];
    async.each(years, function (year, cb) {
        _findByYear(year, function (err, participants) {
            if (err) return cb(err);
            var count = 0;
            async.each(participants, function (participant, cbParticipant) {
                count += participant.days.filter(function (day) { return day.present === true }).length;
                cbParticipant();
            }, function () {
                values.push({ label: year, value: count });
                cb();
            });
        });
    }, function (err) {
        if (err) return callback(err);
        result.push({ key: 'Present', values: values.sort(function (a, b) { return a.label > b.label }) })
        return callback();
    });
};

var _yearlyRegistrationAbsent = function (years, result, callback) {
    var values = [];
    async.each(years, function (year, cb) {
        _findByYear(year, function (err, participants) {
            if (err) return cb(err);
            var count = 0;
            async.each(participants, function (participant, cbParticipant) {
                count += participant.days.filter(function (day) { return day.present === false }).length;
                cbParticipant();
            }, function () {
                values.push({ label: year, value: count });
                cb();
            });
        });
    }, function (err) {
        if (err) return callback(err);
        result.push({ key: 'Absent', values: values.sort(function (a, b) { return a.label > b.label }) })
        return callback();
    });
}

var _getNumberParticipantsDaily = function (year, present, callback) {
    var values = [];
    async.each([1, 2, 3, 4, 5], function (day, cbDay) {
        _findByYearAndDay(year, day, function (err, participants) {
            if (err) return cbDay(err);
            if (present === null) {
                values.push({ label: day, value: participants.length });
                return cbDay();
            }
            var value = 0;
            async.each(participants, function (participant, cbParticipant) {
                var exist = participant.days.filter(function (d) { return d.name === day && d.present === present })[0];
                if (exist) value += 1;
                cbParticipant();
            }, function () {
                values.push({ label: day, value: value });
                cbDay();
            });
        });
    }, function (err) {
        if (err) callback(err);
        return callback(null, values.sort(function (a, b) { return a.label > b.label }));
    });
};

var _dailyParticipant = function (present, callback) {
    if (typeof present === 'function') {
        callback = present;
        present = null;
    }
    _getYears(function (err, years) {
        if (err) return callback(err);
        var result = [];
        async.each(years, function (year, cb) {
            _getNumberParticipantsDaily(year, present, function (err, values) {
                if (err) cb(err);
                result.push({ key: year, values: values });
                return cb();
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
        async.each(years, function (year, cb) {
            var query = { year: year };
            Model.count(query, function (err, count) {
                if (err) return cb(err);
                values.push({ label: year, value: count });
                cb();
            });
        }, function (err) {
            if (err) return res.status(500).json(err);
            return res.status(200).json(values.sort(function (a, b) { return a.label > b.label }));
        });
    });
};

exports.yearlyRegistrations = function (req, res, next) {
    _getYears(function (err, years) {
        if (err) return res.status(500).json(err);
        var result = [];
        async.parallel({
            registration : async.apply(_yearlyRegistration, years, result),
            present : async.apply(_yearlyRegistrationPresent, years, result),
            absent : async.apply(_yearlyRegistrationAbsent, years, result)
        }, function (err) {
            if (err) return res.status(500).json(err);
            return res.status(200).json(result);
        });
    });
};

exports.dailyParticipants = function (req, res, next) {
    _dailyParticipant(function (err, data) {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

exports.dailyParticipantsPresent = function (req, res, next) {
    _dailyParticipant(true, function (err, data) {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

exports.dailyParticipantsAbsent = function (req, res, next) {
    _dailyParticipant(false, function (err, data) {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};
