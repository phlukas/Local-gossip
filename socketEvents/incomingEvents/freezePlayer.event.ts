import { Server, Socket } from 'socket.io';
import { stopFreezePlayerEvent } from '../../eventConstants';
import { freezePlayerEvent } from '../../eventConstants';
import { User } from '../../models/user.model';

export default (io: Server | null, socket: Socket, user: { id: string }) => {
  console.log(`Received freeze event from ${socket.id}.`);

  const timeOutTime = 10000; // 10 seconds

  let lastAddedRoom;

  socket.rooms.forEach((roomId) => {
    lastAddedRoom = roomId;
  });

  if (lastAddedRoom) {
    console.log(`Sending Freeze event from ${socket.id}.`);
    socket.to(lastAddedRoom).emit(freezePlayerEvent, user);

    setTimeout(() => {
      let lastAddedRoom;

      socket.rooms.forEach((roomId) => {
        lastAddedRoom = roomId;
      });

      if (lastAddedRoom) {
        console.log(`Sending stopFreeze event from ${socket.id}.`);
        io?.to(lastAddedRoom).emit(stopFreezePlayerEvent, user);
      }
      else {
        console.log(`Failed to send stopFreeze.`);
      }
    }, timeOutTime);
  }
  else {
    console.log(`Failed to send Freeze.`);
  }

  User.findByIdAndUpdate(user.id, { frozenUntil: Date.now() + timeOutTime }, (err: any) => {
    if (err) {
      console.log(`Cannot update user.frozenUntil ${user.id}.`);
    }
  });




};