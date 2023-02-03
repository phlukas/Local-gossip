import express from 'express';
const router = express.Router();
import { Message } from '../models/message.model';

router.get('/:chatRoomId', (req: any, res: any) => {
  Message.find({ chatRoomId: req.params.chatRoomId }, (err: any, result: any) => {
    res.send(result);
  });
});

module.exports = router;
