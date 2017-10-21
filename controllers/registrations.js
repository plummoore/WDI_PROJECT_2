const User = require('../models/user');

//write a function that renders the registration form
function registrationNew(req, res) {
  res.render('registrations/new');
}


function registrationCreate(req, res, next) {
  User
    .create(req.body)
    .then(() => res.redirect('/login'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest('/register', err.toString());
      next(err);
    });
}

module.exports = {
  new: registrationNew,
  create: registrationCreate
};
