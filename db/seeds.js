const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbUri } = require('../config/environment');

mongoose.connect(dbUri, { useMongoClient: true });

// Require the model
const User = require('../models/user');

// Drop the model
User.collection.drop();

// Create the models
User
  .create([{
    firstName: 'Anne',
    username: 'a',
    email: 'a@a.com',
    password: 'password'
  }, {
    firstName: 'Belinda',
    username: 'b',
    email: 'b@b.com',
    password: 'password'
  }, {
    firstName: 'Carl',
    username: 'c',
    email: 'c@c.com',
    password: 'password'
  }])
  .then(users => console.log(`${users.length} users created!`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
