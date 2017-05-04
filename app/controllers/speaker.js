// services
const ErrorService = require('../services/error');

// models
const Model = require('../models/speaker');

module.exports = {

  renderIndex: (req, res, next) => {
    Model
      .find({})
      .sort('-year date')
      .then(speakers => res.render('speaker/index', { speakers }))
      .catch(err => ErrorService.response(next, err));
  },

  renderNew: (req, res) => {
    res.render('speaker/new');
  },

  create: (req, res, next) => {
    const speaker = new Model(req.body);
    speaker.year = Number(req.body.date.replace(/\/.*/, ''));
    speaker
      .save()
      .then(() => res.redirect('/speaker'))
      .catch(err => ErrorService.response(next, err));
  },

  renderEdit: (req, res, next) => {
    Model
      .findById(req.params.id)
      .then((speaker) => {
        if (!speaker) return next();
        res.render('speaker/edit', { speaker });
      })
      .catch(err => ErrorService.response(next, err));
  },

  update: (req, res, next) => {
    const { id } = req.params;
    Model
      .findById(id)
      .then((speaker) => {
        if (!speaker) return next();
        const { body } = req;
        if (body.date) body.year = Number(body.date.replace(/\/.*/, ''));
        Model
          .update({ _id: id }, { $set: body })
          .then(() => res.redirect('/speaker'))
          .catch(err => ErrorService.response(next, err));
      })
      .catch(err => ErrorService.response(next, err));
  },

  delete: (req, res, next) => {
    const { id } = req.params;
    Model
      .findById(id)
      .then((speaker) => {
        if (!speaker) return next();
        Model
          .remove({ _id: id })
          .then(() => res.redirect('/speaker'))
          .catch(err => ErrorService.response(next, err));
      })
      .catch(err => ErrorService.response(next, err));
  },

};
