const User = require('../models/user');

function sessionNew(req, res) {
  res.render('sessions/new');
}

function sessionCreate(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) {
        req.flash('danger', 'Unknown email/password combination');
        return res.redirect('/');
      }

      req.session.userId = user.id;
      req.session.isAuthenticated = true;
      req.user = user;

      // req.flash('success', `Welcome back, ${user.username}!`); //chose not to use
      res.redirect('/faces');
    })
    .catch(next);
}


function sessionDelete(req, res) {
  return req.session.regenerate(() => {
    req.flash('warning', 'You successfully logged out.');
    res.redirect('/');
  });
}


module.exports = {
  new: sessionNew,
  create: sessionCreate,
  delete: sessionDelete
};
