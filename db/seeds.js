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
    username: 'FluffyKitten',
    email: 'a@a.com',
    password: 'password',
    passwordConfirmation: 'password'
  }, {
    username: 'Pina Colada',
    email: 'b@b.com',
    password: 'password',
    passwordConfirmation: 'password'
  }, {
    username: 'Carl',
    email: 'c@c.com',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created!`);
    return Face
      .create([{
        title: 'Plotting Boxes',
        location: 'The Gherkin, London',
        image: 'https://static.boredpanda.com/blog/wp-content/uuuploads/things-with-faces/things-with-faces-19.jpg',
        rating: 5,
        createdBy: users[0]
      }, {
        title: 'Look Into My Eyes...',
        location: 'Palermo, Italy',
        image: 'https://www.themarysue.com/wp-content/uploads/2011/02/faces_viewfinder.jpg',
        rating: 4,
        createdBy: users[1]
      }, {
        title: 'Golden Oldie',
        location: 'My kitchen, London',
        image: 'https://www.themarysue.com/wp-content/uploads/2011/02/faces_happywood.jpg',
        rating: 4,
        createdBy: users[2]
      },{
        title: 'Love The Barnet',
        location: 'My kitchen, London',
        image: 'https://static.boredpanda.com/blog/wp-content/uuuploads/things-with-faces/things-with-faces-20.jpg',
        rating: 3,
        createdBy: users[2]
      },{
        title: 'Say Cheese',
        location: 'My kitchen, London',
        image: 'https://www.themarysue.com/wp-content/uploads/2011/02/faces_adorableclock.jpg',
        rating: 3,
        createdBy: users[2]
      },{
        title: 'How Much Did I Drink?!',
        location: 'The floor, Wales',
        image: 'https://static.boredpanda.com/blog/wp-content/uploads/2017/04/pareidolia-faces-everyday-objects-98-5901e9152bef8__605.jpg',
        rating: 4,
        createdBy: users[0]
      }]);
  })

  .then((faces) => console.log(`${faces.length} faces created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
