import { Server, Socket } from 'socket.io';
import { MesssageModel } from '../../../types';
import sendMessageEvent from '../outgoingEvents/messageEvent';

export default (messageModel: MesssageModel, io: Server, socket: Socket) => {
  console.log('Sending message:');
  console.log(messageModel);

  let lastAddedRoom;

  socket.rooms.forEach((roomId) => {
    lastAddedRoom = roomId;
  });

  if (lastAddedRoom) {
    sendMessageEvent(io, messageModel, lastAddedRoom);
  } else {
    console.error('Message failed to send - socket was not in the valid room.');
  }
};