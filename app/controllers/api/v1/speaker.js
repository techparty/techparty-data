const Model = require('../../../models/speaker');

module.exports = {

  search: (req, res) => {
    var query = new RegExp(req.body.username, 'i');
    var year = req.body.year || new Date().getFullYear();
    Model
      .find({ name: { $regex: query }, year: year })
      .select('name')
      .then(speakers => res.status(200).json(speakers))
      .catch(err => res.status(500).json(err));
  },

  get: (req, res) => {
    Model
      .findOne({ _id : req.body.id })
      .select('-_id')
      .then(speaker => res.status(200).json(speaker))
      .catch(err => res.status(500).json(err));
  },

};
