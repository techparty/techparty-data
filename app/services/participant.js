// modules
const log = require('winston');

// models
const Model = require('../models/participant');

module.exports = {

  socketPresent : socket => {

    socket.on('present', data => {

      const error = (err) => {
        log.error(err);
        socket.emit('present', err);
      };

      Model
        .findOne({ email: data.email })
        .then(participant => {
          participant.days.forEach(day => {
            if (day._id == data.day) day.present = data.present;
          });

          Model
            .update({ email: data.email }, { $set: { days: participant.days } })
            .then(() => socket.broadcast.emit('present', data))
            .catch(error);
        })
        .catch(error);
    });

  },

};
