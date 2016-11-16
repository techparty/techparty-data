const SpeakerModel = require('../../../models/speaker');

module.exports = {

  get: (req, res, next) => {
    SpeakerModel
      .findOne({ email : req.body.email })
      .select('-_id')
      .then(speaker => res.status(200).json(speaker))
      .catch(err => res.status(500).json(err));
  },

};
