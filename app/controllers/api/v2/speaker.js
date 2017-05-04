const SpeakerModel = require('../../../models/speaker');

module.exports = {

  get: (req, res) => {
    const { email, year } = req.body;
    SpeakerModel
      .findOne({ email, year })
      .select('-_id')
      .then(speaker => res.status(200).json(speaker))
      .catch(err => res.status(500).json(err));
  },

};
