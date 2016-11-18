// modules
const moment = require('moment');
const async = require('async');

// services
const ErrorService = require('../services/error');

// models
const Model = require('../models/participant');

const _getYears = (cb) => {
  Model
    .distinct('year')
    .then(years => cb(null, years.sort()))
    .catch(cb);
};

const _getParticipants = (year, cb) => {
  Model
    .find({ year })
    .sort('-year name')
    .then(participants => cb(null, participants))
    .catch(cb);
};

const _getParticipantById = (id) => {
  return Model.findById(id)
};

module.exports = {

  renderIndex: (req, res, next) => {
    const year = req.params.year || moment().get('year');
    async.parallel({
      years: async.apply(_getYears),
      participants: async.apply(_getParticipants, year),
    }, (err, result) => {
      if (err) return ErrorService.response(next, err);
      res.render('participant/index', {
        participants: result.participants,
        years: result.years,
        year,
      });
    });
  },

  renderNew: (req, res) => {
    res.render('participant/new');
  },

  delete: (req, res, next) => {
    const id = req.params.id;
    _getParticipantById(id)
      .then(participant => {
        if (!participant) return next();
        Model
          .remove({ _id: id })
          .then(() => res.redirect('/participant'))
          .catch(err => ErrorService.response(next, err));
      })
      .catch(err => ErrorService.response(next, err))
  },

};
