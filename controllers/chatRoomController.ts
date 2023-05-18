import express = require('express');
import { ChatRoom } from '../models/chatRoom.model';
import { io } from '../controllers/socketController';
import { exitChatRoomEvent } from '../eventConstants';

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
    io?.to(req.params.id).emit(exitChatRoomEvent);
    io?.sockets.socketsLeave(req.params.id);

    res.send(result);
  });
});

export default router;
