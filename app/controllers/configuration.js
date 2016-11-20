// services
const ErrorService = require('../services/error');

// models
const Model = require('../models/configuration');

const findById = (id) => {
  return new Promise((resolve, reject) => {
    Model
      .findById(id)
      .then((configuration) => {
        if (!configuration) return reject('Not found');
        resolve(configuration);
      })
      .catch(reject);
  });
};

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
    findById(req.params.id)
      .then(configuration => res.render('configuration/edit', { configuration }))
      .catch(err => ErrorService.response(next, err));
  },

  update: (req, res, next) => {
    const { id } = req.params;
    findById(id)
      .then(() => {
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
    findById(id)
      .then(() => {
        Model
          .remove({ _id: id })
          .then(() => res.redirect('/configuration'))
          .catch(err => ErrorService.response(next, err));
      })
      .catch(err => ErrorService.response(next, err));
  },

};
