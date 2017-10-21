const User = require('../models/user');

//write a function that renders the registration form
function registrationNew(req, res) {
  res.render('registrations/new');
}

//write a function that creates the new user

function registrationCreate(req, res) {
  //do something
}

module.exports = {
  new: registrationNew,
  create: registrationCreate
};
