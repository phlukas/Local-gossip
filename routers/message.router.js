const express = require('express');
const router = express.Router();
const Message = require('../models/message.model');

router.get('/', (req, res) => {
  Message.find({}, (err, result) => {
    res.send(result);
  });
});


router.get('/:id', (req, res) => {
  Message.findById(req.query.chatRoomId, (err, result) => {
    res.send(result);
  });
});

router.post('/', (req, res) => {
  var message = new Message();

  message.dateCreated = Date.now();
  console.log(req.body);
  message.chatRoomId = req.body.chatRoomId;
  message.content = req.body.content;
  message.senderId = req.body.senderId;

  message.save((err, result) => {
    if (err) {
      res.send('Cannnot save message: ' + err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
