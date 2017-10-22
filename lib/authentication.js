const User = require('../models/user');


function authentication(req, res, next) {
  if(!req.session.isAuthenticated) return next();
  console.log('authentication first');
  User
    .findById(req.session.userId)
    .then((user) => {
      if(!user) {
        return req.session.regenerate(() => {
          req.flash('danger', 'You must be logged in');
          return res.redirect('/login');
        });
      }
      console.log('authentication second');
      req.session.userId = user.id;
      res.locals.user = user;
      req.user = user;
      res.locals.isAuthenticated = true;

      next();
    });
  console.log('authentication third');
}


module.exports= authentication;
