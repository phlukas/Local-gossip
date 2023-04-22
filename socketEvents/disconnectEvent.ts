import { Socket } from 'socket.io';
import { Client } from '../types';
import { printRemainingUsers } from './userEventGroup/incomingEvents/startSearchingEvent';
import _ from 'lodash';

export default (searchingClients: Client[], socket: Socket) => {
  _.remove(searchingClients, (client: Client) => {
    return client.socket === socket;
  });

  console.log(`Socket with ID ${socket.id} disconnected.`);

  printRemainingUsers(searchingClients);
};
