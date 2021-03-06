const moment = require('moment');
const async = require('async');

const ParticipantModel = require('../../../models/participant');
const ConfigurationModel = require('../../../models/configuration');

const prepareDays = (days) => {
  return days.map((day) => {
    return { name: day };
  });
};

const create = (data, cb) => {
  const participant = new ParticipantModel();
  participant.name = data.name;
  participant.email = data.email;
  participant.cpf = data.cpf;
  participant.year = data.year;
  participant.days = prepareDays(data.days);
  participant.save(cb);
};

const update = (data, cb) => {
  const participant = {
    name: data.name,
    cpf: data.cpf,
    days: prepareDays(data.days),
    email: data.email,
  };
  ParticipantModel.update({ cpf: data.cpf, year: data.year }, { $set: participant }, cb);
};

const findOne = (criteria = {}, select = '') => {
  return ParticipantModel
    .findOne(criteria)
    .select(select);
};

module.exports = {

  search: (req, res) => {
    const query = new RegExp(req.body.name, 'i');
    const year = req.body.year || new Date().getFullYear();
    ParticipantModel
      .find({ name: { $regex: query }, year })
      .select('name')
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err));
  },

  get: (req, res) => {
    findOne({ _id: req.body.id }, '-_id')
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err));
  },

  create: (req, res) => {
    const data = req.body;
    data.cpf = data.cpf.replace(/\D+/g, '');
    data.year = Number(data.year || moment().get('year'));
    if (!data.days) data.days = [];
    else if (typeof data.days === 'string') data.days = data.days.split(',');

    const { cpf, year, days } = data;

    findOne({ cpf, year })
      .then((exist) => {
        async.each(days, (day, cb) => {
          if (exist && exist.days.filter(d => Number(d.name) === Number(day))[0]) return cb();

          ConfigurationModel
            .findOne({ name: `max-year-${year}-day-${day}` })
            .then((configuration) => {
              if (!configuration) return cb();
              ParticipantModel
                .count({ year, 'days.name': day })
                .then((count) => {
                  if (count >= Number(configuration.value)) return cb(`Maximum number of participants reached on day ${day}`);
                  cb();
                })
                .catch(cb);
            })
            .catch(cb);
        }, (err) => {
          if (err) return res.status(400).json(err);

          const response = (err) => {
            if (err) return res.status(500).json(err);
            res.status(200).json({ success: true });
          };

          if (exist) return update(data, response);
          create(data, response);
        });
      })
      .catch(err => res.status(500).json(err));
  },

};
