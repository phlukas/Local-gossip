import { Socket } from 'socket.io';
import { acceptGameEvent } from '../../eventConstants';
import { ChatRoom } from '../../models/chatRoom.model';

export default (socket: Socket) => {
  console.log(`Accepting game invite ${socket.id}.`);

  let lastAddedRoom;

  socket.rooms.forEach((roomId) => {
    lastAddedRoom = roomId;
  });

  if (lastAddedRoom) {
    socket.to(lastAddedRoom).emit(acceptGameEvent);

    ChatRoom.findByIdAndUpdate(lastAddedRoom, { isGameOn: true }, (err: unknown) => {
      if (err) {
        console.log('Cannnot update chatRoom: ' + err);
      }
    });
  } else {
    console.log('Message failed to send - socket was not in the valid room.');
  }
};
