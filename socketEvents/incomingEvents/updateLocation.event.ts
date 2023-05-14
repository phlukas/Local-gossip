import { Socket } from 'socket.io';
import { User } from '../../models/user.model';
import { updateLocationModel } from '../../types';

export default (socket: Socket, user: updateLocationModel) => {
  console.log(`Received freeze event from ${socket.id}.`);

const timeOutTime = 10000; // 10 seconds

User.find( {id: user.userId, frozenUntil: {$gte: Date.now()}}, {frozenUntil: Date.now() + timeOutTime},(err:any) =>{
    if (err) {
        console.log(`Cannot update user.frozenUntil ${user.userId}.`);
      }
    else{
        User.findByIdAndUpdate(user.userId, {latitude: user.lat, longitude: user.lot},(err:any) =>{
            if (err) {
                console.log(`Cannot update user.frozenUntil ${user.userId}.`);
              }
          });
    }
  });
};