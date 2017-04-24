// services
const ErrorService = require('../services/error');

// models
const Model = require('../models/user');

module.exports = {

  renderIndex: (req, res, next) => {
    Model
      .find({})
      .sort('-name')
      .then(data => res.render('user/index', { users: data }))
      .catch(err => ErrorService.response(next, err));
  },

  renderNew: (req, res) => {
    res.render('user/new');
  },

  create: (req, res, next) => {
    const data = new Model(req.body);
    data.name = req.body.name;
    data.username = req.body.username;
    data.password = req.body.password;
    data.isAdmin = req.body.isAdmin;
    data
      .save()
      .then(() => res.redirect('/user'))
      .catch(err => ErrorService.response(next, err));
  },

  renderEdit: (req, res, next) => {
    Model
      .findById(req.params.id)
      .then((data) => {
        if (!data) return next();
        res.render('user/edit', { user: data });
      })
      .catch(err => ErrorService.response(next, err));
  },

  update: (req, res, next) => {
    const { id } = req.params;
    Model
      .findById(id)
      .then((data) => {
        if (!data) return next();
        const { body } = req;
        if (body.name) data.name = body.name;
        if (body.username) data.username = body.username;
        if (body.password) data.password = body.password;
        console.log(body);
        if (body.isAdmin) data.isAdmin = body.isAdmin;
        data
          .save()
          .then(() => res.redirect('/user'))
          .catch(err => ErrorService.response(next, err));
      })
      .catch(err => ErrorService.response(next, err));
  },

  delete: (req, res, next) => {
    const { id } = req.params;
    Model
      .findById(id)
      .then((data) => {
        if (!data) return next();
        data
          .remove()
          .then(() => res.redirect('/user'))
          .catch(err => ErrorService.response(next, err));
      })
      .catch(err => ErrorService.response(next, err));
  },

};
