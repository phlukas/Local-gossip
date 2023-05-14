import { Socket } from 'socket.io';
import { stopFreezePlayerEvent } from '../../eventConstants';
import { User } from '../../models/user.model';

export default (socket: Socket, user: {userid:string}) => {
  console.log(`Received freeze event from ${socket.id}.`);

const timeOutTime = 10000; // 10 seconds

  User.findByIdAndUpdate(user.userid, {frozenUntil: Date.now() + timeOutTime},(err:any) =>{
    if (err) {
        console.log(`Cannot update user.frozenUntil ${user.userid}.`);
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