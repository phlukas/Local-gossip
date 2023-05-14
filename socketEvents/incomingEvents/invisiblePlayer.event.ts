import { Socket } from 'socket.io';
import { stopInvisiblePlayerEvent } from '../../eventConstants';
import { User } from '../../models/user.model';

export default (socket: Socket,  user: {userid:string}) => {
  console.log(`Received invisible event from ${socket.id}.`);
   
  const timeOutTime = 10000; // 10 seconds
  
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
        socket.to(lastAddedRoom).emit(stopInvisiblePlayerEvent);
  }
    else{
        console.log(`Failed to send stopInvisible.`);
    }}, timeOutTime);
};