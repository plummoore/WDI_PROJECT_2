const express = require('express');
const router  = express.Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const faces = require('../controllers/faces');
const secureRoute = require('../lib/secureRoute');

// A home route
router.get('/', (req, res) => res.render('homepage'));

//REGISTERING & SESSIONS
router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

//FACES
router.route('/faces')
  .get(faces.index)
  .post(faces.create);

router.route('/faces/new')
  .get(secureRoute, faces.new);

router.route('/faces/:id')
  .get(faces.show)
  .put(secureRoute, faces.update)
  .delete(secureRoute, faces.delete);

router.route('/faces/:id/edit')
  .get(secureRoute, faces.edit);

//COMMENTS
router.route('/faces/:id/comments')
  .post(faces.commentCreate);

router.route('/faces/:id/comments/:commentId')
  .delete(faces.commentDelete);

router.all('*', (req, res) => res.notFound());

module.exports = router;
