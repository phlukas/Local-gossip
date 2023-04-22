import { Server, Socket } from 'socket.io';
import { exitChatRoomEvent } from '../../eventConstants';

export default (socket: Socket, io: Server) => {
  console.error(`${socket.id} leaving room.`);

  let lastAddedRoom;

  socket.rooms.forEach((roomId) => {
    lastAddedRoom = roomId;
  });

  if (lastAddedRoom) {
    socket.to(lastAddedRoom).emit(exitChatRoomEvent);
    io.sockets.socketsLeave(lastAddedRoom);
  } else {
    console.error('Cannot leave a room because there are no rooms.');
  }
};
