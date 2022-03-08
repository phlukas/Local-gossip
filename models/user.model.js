const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  dateCreated: {
    type: Date,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  Password: {
    type: String,
  },
  ImageUrl: {
    type: String,
  },
  Rank: {
    type: String,
  },
  Latitude: {
    type: Number,
  },
  Longitude: {
    type: Number,
  },
  selectedRadius: {
    type: Number,
  },
  showLocation: {
    type: Boolean,
  },
  showProfile: {
    type: Boolean,
  },
  chatRoomIds: {
    type: Array,
  },
});

module.exports = mongoose.model('UserModel', userSchema);
