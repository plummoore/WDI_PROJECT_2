const express = require('express');
const router  = express.Router();
const registration = require('../controllers/registrations');
const session = require('../controllers/sessions')

// A home route
router.get('/', (req, res) => res.render('homepage'));

router.route('/register')
  .get(registration.new)
  .post(registration.create);

router.route('/login')
  .get(session.new)
  .post(session.create);

router.route('/logout')
  .get(session.delete);




// RESTful routes
// All URLS should contain the PLURAL... don't chose octopus or people or something silly.

// INDEX - yes

// NEW

// SHOW

// CREATE

// EDIT

// UPDATE

// DELETE


module.exports = router;
