require('../config/mongoose');

const request = require('request');
const log = require('winston');
const _ = require('lodash');
const Model = require('../app/models/participant');

request({
  uri: 'http://techparty.faccat.br/participant.json',
  method: 'GET',
  json: true,
}, (err, response, body) => {
  if (err) throw err;

  const participants = body.participants;
  const years = {};

  participants.forEach((participant) => {
    const { year, name } = participant;

    if (!years[year]) years[year] = {};

    if (!years[year][name]) {
      participant.days = [
        { name: 1, present: true },
        { name: 2, present: false },
        { name: 3, present: false },
        { name: 4, present: false },
        { name: 5, present: false },
      ];
      years[year][name] = participant;
    } else {
      for (let i = 0, l = 5; i < l; i += 1) {
        if (!years[year][name].days[i].present) {
          years[year][name].days[i].present = true;
          break;
        }
      }
    }
  });

  _.forEach(years, (year) => {
    Model
      .create(year.name)
      .catch(err => log.error(err));
  });
});
