const express = require('express');
const router  = express.Router();
const registration = require('../controllers/registrations');
const session = require('../controllers/sessions')


// A home route
router.get('/', (req, res) => res.render('homepage'));

//USER SETUP

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

// FACES SETUP

// INDEX
router.get('/faces', (req, res) => res.render('faces/index'));

// NEW
router.get('/faces/new', (req, res) => res.render('faces/new'));

// SHOW
router.get('/faces/:id', (req, res) => res.render('faces/show'));

// CREATE
router.post('/faces', (req, res) => res.send('CREATE'));

// EDIT
router.get('/faces/:id/edit', (req, res) => res.render('faces/edit'));

// UPDATE
router.put('/faces/:id', (req, res) => res.send('UPDATE'));

// DELETE
router.delete('/faces/:id', (req, res) => res.send('DELETE'));

module.exports = router;
