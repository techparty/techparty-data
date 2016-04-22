'use strict';

// modules
const async = require('async');

// models
const Model = require('../models/v1/participant');

let _findByYear = (year, cb) => {
    return Model.find({ year: year });
};

let _findByYearAndDay = (year, day, cb) => {
    return Model.find({ year: year, 'days.name': day });
};

let _getYears = cb => {
    return Model.distinct('year');
};

let _yearlyRegistration = (years, result, callback) => {
    let values = [];
    async.each(years, (year, cb) => {
        _findByYear(year)
            .then(participants => {
                let count = 0;
                async.each(participants, (participant, cbParticipant) => {
                    count += participant.days.length;
                    cbParticipant();
                }, () => {
                    values.push({ label: year, value: count });
                    cb();
                });
            })
            .catch(err => {
                cb(err);
            })
    }, err => {
        if (err) return callback(err);
        result.push({ key: 'Registration', values: values.sort((a, b) => a.label > b.label) })
        return callback();
    });
};

let _yearlyRegistrationPresent = (years, result, callback) => {
    let values = [];
    async.each(years, (year, cb) => {
        _findByYear(year)
            .then(participants => {
                let count = 0;
                async.each(participants, (participant, cbParticipant) => {
                    count += participant.days.filter(day => day.present === true).length;
                    cbParticipant();
                }, () => {
                    values.push({ label: year, value: count });
                    cb();
                });
            })
            .catch(err => {
                cb(err);
            })
    }, err => {
        if (err) return callback(err);
        result.push({ key: 'Present', values: values.sort((a, b) => a.label > b.label) })
        return callback();
    });
};

let _yearlyRegistrationAbsent = (years, result, callback) => {
    let values = [];
    async.each(years, (year, cb) => {
        _findByYear(year)
            .then(participants => {
                let count = 0;
                async.each(participants, (participant, cbParticipant) => {
                    count += participant.days.filter(day => { return day.present === false }).length;
                    cbParticipant();
                }, () => {
                    values.push({ label: year, value: count });
                    cb();
                });
            })
            .catch(err => {
                cb(err);
            })
    }, err => {
        if (err) return callback(err);
        result.push({ key: 'Absent', values: values.sort((a, b) => a.label > b.label) })
        return callback();
    });
}

let _getNumberParticipantsDaily = (year, present, callback) => {
    let values = [];
    async.each([1, 2, 3, 4, 5], (day, cbDay) => {
        _findByYearAndDay(year, day)
            .then(participants => {
                if (present === null) {
                    values.push({ label: day, value: participants.length });
                    return cbDay();
                }
                let value = 0;
                async.each(participants, (participant, cbParticipant) => {
                    let exist = participant.days.filter(d => d.name === day && d.present === present)[0];
                    if (exist) value += 1;
                    cbParticipant();
                }, () => {
                    values.push({ label: day, value: value });
                    cbDay();
                });
            })
            .catch(err => {
                cbDay(err);
            })
    }, err => {
        if (err) callback(err);
        return callback(null, values.sort((a, b) => a.label > b.label));
    });
};

let _dailyParticipant = (present, callback) => {
    if (typeof present === 'function') {
        callback = present;
        present = null;
    }
    _getYears()
        .then(years => {
            let result = [];
            async.each(years, (year, cb) => {
                _getNumberParticipantsDaily(year, present, (err, values) => {
                    if (err) cb(err);
                    result.push({ key: year, values: values });
                    return cb();
                });
            }, err => {
                if (err) callback(err);
                return callback(null, result.sort((a, b) => a.key > b.key));
            });
        })
        .catch(err => {
            return callback(err);
        });
};

module.exports = {

    renderIndex : (req, res, next) => {
        return res.render('index');
    },

    yearlyParticipants : (req, res, next) => {
        _getYears()
            .then(years => {
                let values = [];
                async.each(years, (year, cb) => {
                    let query = { year: year };
                    Model.count(query, (err, count) => {
                        if (err) return cb(err);
                        values.push({ label: year, value: count });
                        cb();
                    });
                }, err => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json(values.sort((a, b) => a.label > b.label));
                });
            })
            .catch(err => {
                res.status(500).json(err);
            })
    },

    yearlyRegistrations : (req, res, next) => {
        _getYears()
            .then(years => {
                let result = [];
                async.parallel({
                    registration : async.apply(_yearlyRegistration, years, result),
                    present : async.apply(_yearlyRegistrationPresent, years, result),
                    absent : async.apply(_yearlyRegistrationAbsent, years, result)
                }, err => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json(result);
                });
            })
            .catch(err => {
                res.status(500).json(err);
            })
    },

    dailyParticipants : (req, res, next) => {
        _dailyParticipant((err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    },

    dailyParticipantsPresent : (req, res, next) => {
        _dailyParticipant(true, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    },

    dailyParticipantsAbsent : (req, res, next) => {
        _dailyParticipant(false, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    },

};
