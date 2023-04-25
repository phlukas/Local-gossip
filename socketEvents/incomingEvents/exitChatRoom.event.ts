import { Server, Socket } from 'socket.io';
import { exitChatRoomEvent } from '../../eventConstants';
import { ChatRoom } from '../../models/chatRoom.model';

export default (socket: Socket, io: Server) => {
  console.log(`${socket.id} leaving room.`);

  let lastAddedRoom;

  socket.rooms.forEach((roomId) => {
    lastAddedRoom = roomId;
  });

  if (lastAddedRoom) {
    socket.to(lastAddedRoom).emit(exitChatRoomEvent);
    io.sockets.socketsLeave(lastAddedRoom);
    ChatRoom.findByIdAndDelete(lastAddedRoom, (err: any) => {
      if (err) {
        console.error('Cannot delete a room. Continuing...');
      }
    });
  } else {
    console.error('Cannot leave a room because there are no rooms.');
  }
};
