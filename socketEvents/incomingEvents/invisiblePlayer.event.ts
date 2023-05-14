import { Server, Socket } from 'socket.io';
import { stopInvisiblePlayerEvent } from '../../eventConstants';
import { invisiblePlayerEvent } from '../../eventConstants';
import { User } from '../../models/user.model';

export default (io: Server | null,socket: Socket,  user: {userid:string}) => {
  console.log(`Received invisible event from ${socket.id}.`);
   
  const timeOutTime = 10000; // 10 seconds
  
  let lastAddedRoom;

  socket.rooms.forEach((roomId) => {
    lastAddedRoom = roomId;
  });

  if (lastAddedRoom){
      console.log(`Sending invisible event from ${socket.id}.`);
      socket.to(lastAddedRoom).emit(invisiblePlayerEvent, user);
    }
  else{
      console.log(`Failed to send invisible.`);
  }

  User.findByIdAndUpdate(user.userid, {invisibleUntil: Date.now() + timeOutTime},(err:any) =>{
    if (err) {
        console.log(`Cannot update user.invisibleUntil ${user.userid}.`);
      }
  });

  setTimeout(() => {
    let lastAddedRoom;

    socket.rooms.forEach((roomId) => {
      lastAddedRoom = roomId;
    });
  
    if (lastAddedRoom){
        console.log(`Sending stopInvisiblePlayer event from ${socket.id}.`);
        io?.to(lastAddedRoom).emit(stopInvisiblePlayerEvent, user);
  }
    else{
        console.log(`Failed to send stopInvisible.`);
    }}, timeOutTime);
};