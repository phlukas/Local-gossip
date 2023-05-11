import { Socket } from 'socket.io';
import { cancelGameEvent } from '../../eventConstants';

export default (socket: Socket) => {
  console.log(`Canceling game invite ${socket.id}.`);

  let lastAddedRoom;

  socket.rooms.forEach((roomId) => {
    lastAddedRoom = roomId;
  });

  if (lastAddedRoom) {
    socket.to(lastAddedRoom).emit(cancelGameEvent);
  } else {
    console.log('Message failed to send - socket was not in the valid room.');
  }
};
