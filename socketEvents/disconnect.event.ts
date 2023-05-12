import { Socket } from 'socket.io';
import { Client } from '../types';
import { printRemainingUsers } from './incomingEvents/startSearching.event';
import _ from 'lodash';
import { ChatRoom } from '../models/chatRoom.model';
import { exitChatRoomEvent } from '../eventConstants';

export default (searchingClients: Client[], socket: Socket) => {
  _.remove(searchingClients, (client: Client) => {
    return client.socket === socket;
  });

  let lastAddedRoom;

  socket.rooms.forEach((roomId) => {
    lastAddedRoom = roomId;
    socket.to(roomId).emit(exitChatRoomEvent);
  });

  ChatRoom.findByIdAndDelete(lastAddedRoom, (err: any) => {
    if (err) {
      console.log('Cannot delete a room. Continuing...');
    }
  });

  console.log(`Socket with ID ${socket.id} disconnected.`);

  printRemainingUsers(searchingClients);
};
