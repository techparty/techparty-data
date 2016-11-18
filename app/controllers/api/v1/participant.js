const moment = require('moment');
const async = require('async');

const ParticipantModel = require('../../../models/participant');
const ConfigurationModel = require('../../../models/configuration');

const _create = (data, cb) => {
  let participant = new ParticipantModel();
  participant.name = data.name;
  participant.email = data.email;
  participant.cpf = data.cpf;
  participant.year = data.year;
  participant.days = [];
  data.days.forEach((day) => { participant.days.push({ name: day }); });
  participant.save(cb);
};

const _update = (data, cb) => {
  let update = {
    name: data.name,
    cpf: data.cpf,
    days: [],
    email: data.email,
  };
  data.days.forEach((day) => { update.days.push({ name: day }); });
  ParticipantModel.update({ cpf: data.cpf, year: data.year }, { $set: update }, cb);
};

module.exports = {

  search: (req, res) => {
    const query = new RegExp(req.body.name, 'i');
    const year = req.body.year || new Date().getFullYear();
    ParticipantModel
      .find({ name: { $regex: query }, year })
      .select('name')
      .then(participants => res.status(200).json(participants))
      .catch(err => res.status(500).json(err));
  },

  get: (req, res) => {
    ParticipantModel
      .findOne({ _id : req.body.id })
      .select('-_id')
      .then(participant => res.status(200).json(participant))
      .catch(err => res.status(500).json(err));
  },

  create: (req, res) => {
    req.body.year = Number(req.body.year || moment().get('year'));
    req.body.days = !req.body.days ? [] : Array.isArray(req.body.days) ? req.body.days : req.body.days.split(',');

    const { cpf, year, days } = req.body;

    ParticipantModel
      .findOne({ cpf, year })
      .then(exist => {
        async.each(days, (day, cb) => {

          if (exist && exist.days.filter(d => Number(d.name) === Number(day))[0]) return cb();

          ConfigurationModel
            .findOne({ name : `max-year-${year}-day-${day}` })
            .then(configuration => {
                if (!configuration) return cb();
                ParticipantModel
                  .count({ year, 'days.name': day })
                  .then(count => {
                      if (count >= Number(configuration.value)) return cb(`Maximum number of participants reached on day ${day}`);
                      cb();
                  })
                  .catch(cb);
            })
            .catch(cb);
        }, err => {
          if (err) return res.status(400).json(err);

          let _response = (err) => {
            err ? res.status(500).json(err) : res.status(200).json({ success: true });
          };

          exist ? _update(req.body, _response) : _create(req.body, _response);
        });
      })
      .catch(err => res.status(500).json(err));
  },

};
