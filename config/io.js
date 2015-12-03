'use strict';

module.exports = function (server) {

    var participant = require('../app/services/participant');

    var io = require('socket.io')(server);

    io.on('connection', function (socket) {

        participant.socketPresent(socket);

    });

};