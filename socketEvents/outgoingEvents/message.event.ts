import { Server } from 'socket.io';
import { messageEvent } from '../../eventConstants';
import { MesssageModel } from '../../types';
import { Message } from '../../models/message.model';

export default (io: Server, messageModel: MesssageModel, room: string) => {
  io.to(room).emit(messageEvent, { ...messageModel });
  Message.create(messageModel);
};
