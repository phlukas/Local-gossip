const mongoose = require('mongoose');

var chatRoomSchema = new mongoose.Schema({
  dateCreated: {
    type: Date,
  },
});

module.exports = mongoose.model('ChatRoomModel', chatRoomSchema);
