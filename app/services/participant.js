'use strict';

var Model = require('../models/v1/participant');

exports.socketPresent = function (socket) {

    socket.on('present', function (data) {

        Model.findOne({ email: data.email }, function (err, participant) {
            if (err) {
                return console.error(err);
            }

            participant.days.forEach(function (day) {
                if (day._id == data.day) {
                    day.present = data.present;
                }
            });

            Model.update({ email: data.email }, { $set: { days: participant.days } }, function (err) {
                if (err) {
                    return socket.broadcast.emit('present', err);
                }

                return socket.broadcast.emit('present', data);
            });
        });
    });

};