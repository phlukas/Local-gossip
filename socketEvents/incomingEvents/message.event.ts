import { Server, Socket } from 'socket.io';
import { MesssageModel } from '../../types';
import sendMessageEvent from '../outgoingEvents/message.event';

export default (messageModel: MesssageModel, io: Server | null, socket: Socket) => {
  console.log('Sending message:');
  console.log(messageModel);

  let lastAddedRoom;

  socket.rooms.forEach((roomId) => {
    lastAddedRoom = roomId;
  });

  if (lastAddedRoom) {
    sendMessageEvent(io, messageModel, lastAddedRoom);
  } else {
    console.log('Message failed to send - socket was not in the valid room.');
  }
};
