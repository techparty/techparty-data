module.exports = (server) => {
  const ParticipantService = require('../app/services/participant');

  const io = require('socket.io')(server);

  io.on('connection', (socket) => {
    ParticipantService.socketPresent(socket);
  });
};
