// const User = require('../models/user');
//
// function sessionNew (req, res) {
//   res.render('sessions/new');
// }
//
// function sessionCreate(req, res) {
//   User
//     .findOne({ email: req.body.email })
//     .then((user) => {
//       if(!user || !user.validatePassword(req.body.password)) {
//         return res.status(401).render('sessions/new', { message: 'Oops! Unrecognised credentials, please try again.' });
//       }
//
//       req.session.userId = user.id;
//
//       return res.redirect('/');
//     });
// }
//
// function sessionDelete(req,res) {
//   return req.session.regenerate(() => res.redirect('/'));
// }

const User = require('../models/user');

function sessionNew(req, res) {
  res.render('sessions/new');
}

function sessionCreate(req, res) {
  User
    .findOne({ email: req.body.email })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.status(401).render('sessions/new', { message: 'Unrecognised credentials' });
      }
      req.flash('success', `Welcome back ${user.username}`);
      req.session.userId = user._id;

      return res.redirect('/');
    });
}

function sessionDelete(req, res) {
  return req.session.regenerate(() => {
    req.flash('success', 'You successfully logged out.');
    res.redirect('/');
  });
}


module.exports = {
  new: sessionNew,
  create: sessionCreate,
  delete: sessionDelete
};
