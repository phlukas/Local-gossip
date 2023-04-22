import { Socket } from 'socket.io';
import { startGameEvent } from '../../eventConstants';

export default (socket: Socket) => {
  console.log(`Sending game invite from ${socket.id}.`);

  let lastAddedRoom;

  socket.rooms.forEach((roomId) => {
    lastAddedRoom = roomId;
  });

  if (lastAddedRoom) {
    socket.to(lastAddedRoom).emit(startGameEvent);
  } else {
    console.error('Message failed to send - socket was not in the valid room.');
  }
};
