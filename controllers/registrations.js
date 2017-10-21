const User = require('../models/user');

//write a function that renders the registration form
function registrationNew(req, res) {
  res.render('registrations/new');
}


function registrationCreate(req, res, next) {
  User
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.status(400).render('registrations/new', { message: 'Passwords do not match' });
      } res.badRequest('/register', err.toString());
      next(err);
      res.status(500).end();
    });
}


// function registrationCreate(req, res) {
//   User
//     .create(req.body)
//     .then(() => res.redirect('/'))
//   // console.log(`${req.body} added`)
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         return res.status(400).render('registrations/new', { message: 'Passwords do not match' });
//       }
//       res.status(500).end();
//     });
// }

// function registrationCreate(req, res) {
//   User
//     .create(req.body)
//     .then(() => {
//       res.redirect('/');
//     })
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         return res.status(400).render('registrations/new', { message: 'Passwords do not match' });
//       }
//       res.status(500).end();
//     });
// }

module.exports = {
  new: registrationNew,
  create: registrationCreate
};
