'use strict';

// modules
const log = require('winston');

// models
const Model = require('../models/v1/participant');

module.exports = {

    socketPresent : socket => {

        socket.on('present', data => {

            Model.findOne({ email: data.email }, (err, participant) => {
                if (err) return log.error(err);

                participant.days.forEach(day => {
                    if (day._id == data.day) {
                        day.present = data.present;
                    }
                });

                Model.update({ email: data.email }, { $set: { days: participant.days } }, err => {
                    if (!err) return socket.broadcast.emit('present', data);

                    log.error(err);
                    return socket.broadcast.emit('present', err);
                });
            });
        });

    }

};