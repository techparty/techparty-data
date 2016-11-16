// services
const ErrorService = require('../services/error');

// models
const Model = require('../models/configuration');

module.exports = {

  renderIndex: (req, res, next) => {
    Model
      .find({})
      .sort('-name')
      .then(settings => res.render('configuration/index', { settings: settings }))
      .catch(err => ErrorService.response(next, err));
  },

  renderNew: (req, res, next) => {
    res.render('configuration/new');
  },

  create: (req, res) => {
    const configuration = new Model(req.body);
    configuration
      .save()
      .then(() => res.redirect('/configuration'))
      .catch(err => ErrorService.response(next, err));
  },

  renderEdit: (req, res, next) => {
    Model
      .findById(req.params.id)
      .then(configuration => {
          if (!configuration) return next();
          res.render('configuration/edit', { configuration: configuration });
      })
      .catch(err => ErrorService.response(next, err));
  },

  update: (req, res, next) => {
    Model
      .findById(req.params.id)
      .then(configuration => {
        if (!configuration) return next();
        delete req.body._id;
        Model
          .update({ _id: req.params.id }, { $set : req.body })
          .then(() => res.redirect('/configuration'))
          .catch(err => ErrorService.response(next, err));
      })
      .catch(err => ErrorService.response(next, err));
  },

  delete: (req, res, next) => {
    const id = req.params.id;
    Model
      .findById(id)
      .then(configuration => {
        if (!configuration) return next();
        Model
          .remove({ _id: id })
          .then(() => res.redirect('/configuration'))
          .catch(err => ErrorService.response(next, err));
      })
      .catch(err => ErrorService.response(next, err));
  },

};
