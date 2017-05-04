const ParticipantModel = require('../../../models/participant');

module.exports = {

  get: (req, res) => {
  	const { email, cpf, year } = req.body;
    ParticipantModel
      .findOne({ email, cpf, year })
      .select('-_id')
      .then(participant => res.status(200).json(participant))
      .catch(err => res.status(500).json(err));
  },

};
