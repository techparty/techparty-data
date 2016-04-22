'use strict';

module.exports = server => {

    const participant = require('../app/services/participant');

    const io = require('socket.io')(server);

    io.on('connection', socket => {
        participant.socketPresent(socket);
    });

};