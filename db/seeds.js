const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbUri } = require('../config/environment');

mongoose.connect(dbUri, { useMongoClient: true });

// Require the model
const User = require('../models/user');
const Face = require('../models/face');

// Drop the model
User.collection.drop();
Face.collection.drop();

// Create the models
User
  .create([{
    username: 'a',
    email: 'a@a.com',
    password: 'password'
  }, {
    username: 'b',
    email: 'b@b.com',
    password: 'password'
  }, {
    username: 'c',
    email: 'c@c.com',
    password: 'password'
  }])
  .then(users => console.log(`${users.length} users created!`));
return Face
  .create([{
    title: 'Plotting Boxes',
    location: 'The Gherkin, London',
    image: 'https://static.boredpanda.com/blog/wp-content/uuuploads/things-with-faces/things-with-faces-19.jpg',
    rating: 5
  }, {
    title: 'Look Into My Eyes...',
    location: 'Palermo, Italy',
    image: 'https://www.themarysue.com/wp-content/uploads/2011/02/faces_viewfinder.jpg',
    rating: 4
  }])
  .then((faces) => console.log(`${faces.length} faces created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
