import { Server } from 'socket.io';
import { chatRoomEventGroup, messageEvent } from '../../../eventConstants';
import { MesssageModel } from '../../../types';

export default (io: Server, messageModel: MesssageModel, room: string) => {
  io.to(room).emit(chatRoomEventGroup, {
    type: messageEvent, //TODO: use ...messsageModel to simplify syntax
    userId: messageModel.userId,
    message: messageModel.message,
  });
};
