import { Server, Socket } from 'socket.io';
import { exitChatRoomEvent } from '../../eventConstants';
import { ChatRoom } from '../../models/chatRoom.model';

export default (socket: Socket, io: Server | null) => {
  console.log(`${socket.id} leaving room.`);

  let lastAddedRoom;

  socket.rooms.forEach((roomId) => {
    lastAddedRoom = roomId;
    socket.to(roomId).emit(exitChatRoomEvent);
  });

  if (lastAddedRoom) {
    socket.leave(lastAddedRoom);
    io?.sockets.socketsLeave(lastAddedRoom);
    ChatRoom.findByIdAndDelete(lastAddedRoom, (err: any) => {
      if (err) {
        console.log('Cannot delete a room. Continuing...');
      }
    });
  } else {
    console.log('Cannot leave a room because there are no rooms.');
  }
};
