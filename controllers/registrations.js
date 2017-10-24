const User = require('../models/user');

//write a function that renders the registration form
function registrationNew(req, res) {
  res.render('registrations/new');
}


function registrationCreate(req, res) {
  User
    .create(req.body)
    .then((user) => {
      req.flash('info', `Welcome to faces in places, ${user.username}!`);
      req.session.userId = user._id;
      res.redirect('/');
      console.log(`${user._id}!`);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).render('registrations/new', { message: 'Passwords do not match' });
      }
      res.status(500).end();
    });
}


module.exports = {
  new: registrationNew,
  create: registrationCreate
};
