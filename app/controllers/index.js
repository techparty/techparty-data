// modules
const async = require('async');
const log = require('winston');

// models
const Model = require('../models/participant');

const _findByYear = (year, cb) => {
  return Model.find({ year: year }).select('days');
};

const _findByYearAndDay = (year, day, cb) => {
  return Model.find({ year: year, 'days.name': day }).select('days');
};

const _getYears = cb => {
  return Model.distinct('year');
};

const _dataYearlyRegistration = (year, participants, valuesTotal, valuesPresent, valuesAbsent, cb) => {
  let countTotal = 0;
  let countPresent = 0;
  let countAbsent = 0;
  async.each(participants, (participant, cb) => {
    const days = participant.days;
    countTotal += days.length;
    countPresent += days.filter(day => day.present === true).length;
    countAbsent += days.filter(day => day.present === false).length;
    cb();
  }, () => {
    valuesTotal.push({ label: year, value: countTotal });
    valuesPresent.push({ label: year, value: countPresent });
    valuesAbsent.push({ label: year, value: countAbsent });
    cb();
  });
};

const _getNumberParticipantsDaily = (year, present, callback) => {
  return new Promise((resolve, reject) => {
    let values = [];
    async.each([1, 2, 3, 4, 5], (day, cb) => {
      _findByYearAndDay(year, day)
        .then(participants => {
          if (present === null) {
            values.push({ label: day, value: participants.length });
            return cb();
          }
          let value = 0;
          async.each(participants, (participant, cb) => {
            let exist = participant.days.filter(d => d.name === day && d.present === present)[0];
            if (exist) value += 1;
            cb();
          }, () => {
            values.push({ label: day, value });
            cb();
          });
        })
        .catch(cb);
    }, err => {
      if (err) return reject(err);
      resolve(values.sort((a, b) => a.label > b.label));
    });
  });
};

const _dailyParticipant = (present = null) => {
  return new Promise((resolve, reject) => {
    _getYears()
      .then(years => {
        let result = [];
        async.each(years, (year, cb) => {
          _getNumberParticipantsDaily(year, present)
            .then(values => {
              result.push({ key: year, values: values });
              cb();
            })
            .catch(cb);
        }, err => {
          if (err) return reject(err);
          resolve(result.sort((a, b) => a.key > b.key));
        });
      })
      .catch(reject);
  });
};

module.exports = {

  renderIndex: (req, res, next) => {
    res.render('index');
  },

  yearlyParticipants: (req, res, next) => {
    _getYears()
      .then(years => {
        let values = [];
        async.each(years, (year, cb) => {
          Model
            .count({ year })
            .then(count => {
              values.push({ label: year, value: count });
              cb();
            })
            .catch(cb);
        }, err => {
          if (err) return res.status(500).json(err);
          res.status(200).json(values.sort((a, b) => a.label > b.label));
        });
      })
      .catch(err => res.status(500).json(err));
  },

  yearlyRegistrations: (req, res, next) => {
    _getYears()
      .then(years => {
        const valuesTotal = [];
        const valuesPresent = [];
        const valuesAbsent = [];
        async.each(years, (year, cb) => {
          _findByYear(year)
            .then(participants => _dataYearlyRegistration(year, participants, valuesTotal, valuesPresent, valuesAbsent, cb))
            .catch(cb);
        }, err => {
          if (err) return res.status(500).json(err);
          const result = [];
          result.push({ key: 'Total', values: valuesTotal.sort((a, b) => a.label > b.label) });
          result.push({ key: 'Present', values: valuesPresent.sort((a, b) => a.label > b.label) });
          result.push({ key: 'Absent', values: valuesAbsent.sort((a, b) => a.label > b.label) });
          res.status(200).json(result);
        });
      })
      .catch(err => res.status(500).json(err));
  },

  dailyParticipants: (req, res, next) => {
    _dailyParticipant()
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err));
  },

  dailyParticipantsPresent: (req, res, next) => {
    _dailyParticipant(true)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err));
  },

  dailyParticipantsAbsent: (req, res, next) => {
    _dailyParticipant(false)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err));
  },

};
