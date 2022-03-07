const mongoose = require('mongoose');

var locationSchema = new mongoose.Schema({
  dateCreated: {
    type: Date,
  },
  chatroom: {
    type: String,
  },
  ImageUrl: {
    type: String,
  },
  Latitude: {
    type: Number,
  },
  Longitude: {
    type: Number,
  },
  name: {
    type: String,
  },
});

module.exports = mongoose.model('LocationModel', locationSchema);
