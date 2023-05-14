import { Socket } from 'socket.io';
import { stopFreezePlayerEvent } from '../../eventConstants';
import { User } from '../../models/user.model';
import { updateLocationModel } from '../../types';

export default (socket: Socket, user: updateLocationModel) => {
  console.log(`Received freeze event from ${socket.id}.`);

const timeOutTime = 10000; // 10 seconds

  User.findByIdAndUpdate(user.userId, {frozenUntil: Date.now() + timeOutTime},(err:any) =>{
    if (err) {
        console.log(`Cannot update user.frozenUntil ${user.userId}.`);
      }
  });
  
    setTimeout(() => {
        let lastAddedRoom;

        socket.rooms.forEach((roomId) => {
          lastAddedRoom = roomId;
        });
      
        if (lastAddedRoom){
            console.log(`Sending stopFreeze event from ${socket.id}.`);
            socket.to(lastAddedRoom).emit(stopFreezePlayerEvent);
      }
        else{
            console.log(`Failed to send stopFreeze.`);
        }}, timeOutTime);

};