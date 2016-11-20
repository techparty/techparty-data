// services
const ErrorService = require('../services/error');

// models
const Model = require('../models/configuration');

module.exports = {

  renderIndex: (req, res, next) => {
    Model
      .find({})
      .sort('-name')
      .then(settings => res.render('configuration/index', { settings }))
      .catch(err => ErrorService.response(next, err));
  },

  renderNew: (req, res) => {
    res.render('configuration/new');
  },

  create: (req, res, next) => {
    const configuration = new Model(req.body);
    configuration
      .save()
      .then(() => res.redirect('/configuration'))
      .catch(err => ErrorService.response(next, err));
  },

  renderEdit: (req, res, next) => {
    Model
      .findById(req.params.id)
      .then((configuration) => {
        if (!configuration) return next();
        res.render('configuration/edit', { configuration });
      })
      .catch(err => ErrorService.response(next, err));
  },

  update: (req, res, next) => {
    const { id } = req.params;
    Model
      .findById(id)
      .then((configuration) => {
        if (!configuration) return next();
        const { body } = req;
        delete body._id;
        Model
          .update({ _id: id }, { $set: body })
          .then(() => res.redirect('/configuration'))
          .catch(err => ErrorService.response(next, err));
      })
      .catch(err => ErrorService.response(next, err));
  },

  delete: (req, res, next) => {
    const id = req.params.id;
    Model
      .findById(id)
      .then((configuration) => {
        if (!configuration) return next();
        Model
          .remove({ _id: id })
          .then(() => res.redirect('/configuration'))
          .catch(err => ErrorService.response(next, err));
      })
      .catch(err => ErrorService.response(next, err));
  },

};
