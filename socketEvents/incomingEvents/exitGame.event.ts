import { Socket } from 'socket.io';
import { ChatRoom } from '../../models/chatRoom.model';
import { exitGameEvent } from '../../eventConstants';

export default (socket: Socket) => {
  console.log(`Received exit Game Event from ${socket.id}.`);

  let lastAddedRoom;

  socket.rooms.forEach((roomId) => {
    lastAddedRoom = roomId;
  });

  if (lastAddedRoom) {
    
    socket.to(lastAddedRoom).emit(exitGameEvent);

    ChatRoom.findByIdAndUpdate(lastAddedRoom, { isGameOn: false }, (err: unknown) => {
      if (err) {
        console.log('Cannnot update chatRoom: ' + err);
      }
    });
  } else {
    console.log('Message failed to send - socket was not in the valid room.');
  }
};