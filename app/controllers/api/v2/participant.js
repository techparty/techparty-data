const ParticipantModel = require('../../../models/participant');

module.exports = {

  get: (req, res) => {
    ParticipantModel
      .findOne({ email: req.body.email, cpf: req.body.cpf })
      .select('-_id')
      .then(participant => res.status(200).json(participant))
      .catch(err => res.status(500).json(err));
  },

};
