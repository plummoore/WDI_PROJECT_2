const mongoose = require('mongoose');

const faceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true }
});

module.exports = mongoose.model('Face', faceSchema);