import { Socket } from 'socket.io';
import { User } from '../../models/user.model';
import { updateLocationModel } from '../../types';
import { updateLocationEvent } from '../../eventConstants';

export default (socket: Socket, userLocationModel: updateLocationModel) => {
  console.log(`Received freeze event from ${socket.id}.`);

  let lastAddedRoom;

    socket.rooms.forEach((roomId) => {
    lastAddedRoom = roomId;
    });

    if (lastAddedRoom){
        console.log(`Sending updateLocation event from ${socket.id}.`);
        socket.to(lastAddedRoom).emit(updateLocationEvent, userLocationModel);
    }
    else{
        console.log(`Failed to send invisible.`);
    }

User.find( {id: userLocationModel.userId, frozenUntil: {$gte: Date.now()}},(err:any) =>{
    if (err) {
        console.log(`user is not visible ${userLocationModel.userId}.`);
      }
    else{
        User.findByIdAndUpdate(userLocationModel.userId, {latitude: userLocationModel.lat, longitude: userLocationModel.lot},(err:any) =>{
            if (err) {
                console.log(`Cannot update user.frozenUntil ${userLocationModel.userId}.`);
              }
          });
          
    }
  });
};