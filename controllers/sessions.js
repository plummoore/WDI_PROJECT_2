const User = require('../models/user');

function sessionNew (req, res) {
  res.render('sessions/new');
}

function sessionCreate(req, res) {
  User
    .findOne({ email: req.body.email })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.status(401).render('sessions/new', { message: 'Oops! Unrecognised credentials, please try again.' });
      }

      req.session.userId = user.id;

      return res.redirect('/');
    });
}

function sessionDelete(req,res) {
  return req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  new: sessionNew,
  create: sessionCreate,
  delete: sessionDelete
};
