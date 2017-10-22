const express = require('express');
const router  = express.Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const faces = require('../controllers/faces');
const secureRoute = require('../lib/secureRoute');

// A home route
router.get('/', (req, res) => res.render('homepage'));

//USER SETUP

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/faces')
  .get(faces.new)
  .post(faces.create);

router.get('/faces/new')
  .get(faces.new)
  .get(secureRoute, faces.new);

router.get('/faces/:id')
  .get(faces.show)
  .put(secureRoute, faces.update)
  .delete(secureRoute, faces.delete);

router.get('/faces/:id/edit')
  .get(secureRoute, faces.edit);

router.all('*', (req, res) => res.notFound());


module.exports = router;
