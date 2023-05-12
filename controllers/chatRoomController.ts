import express = require('express');
import { ChatRoom } from '../models/chatRoom.model';

const router = express.Router();

router.get('/', (req, res) => {
  ChatRoom.find({}, (err: any, result: any) => {
    res.send(result);
  });
});

router.get('/:id', (req, res) => {
  ChatRoom.findById(req.params.id, (err: express.Errback, result: express.Response) => {
    res.send(result);
  });
});

router.delete('/:id', (req, res) => {
  ChatRoom.findByIdAndDelete(req.params.id, (err: express.Errback, result: express.Response) => {
    res.send(result);
  });
});

export default router;
