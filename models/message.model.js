const mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
  dateCreated: {
    type: Date,
  },
  chatRoomId: {
    type: String,
  },
  content: {
    type: String,
  },
  senderId: {
    type: String,
  },
});

module.exports = mongoose.model('MessageModel', messageSchema);
