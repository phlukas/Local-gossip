import { Socket } from 'socket.io';
import { Client, SearchingModel } from '../../../types';
import { IUser, User } from '../../../models/user.model';
import sendChatRoomFoundEvent from '../../chatRoomEventGroup/outgoingEvents/chatRoomFoundEvent';
import _ from 'lodash';

export default (socket: Socket, searchingClients: Client[], searchingModel: SearchingModel) => {
  searchingClients.push({
    socket: socket,
    userId: searchingModel.userId,
    radius: searchingModel.kilometers,
  });

  findPairAsync(searchingClients);
};

async function findPairAsync(searchingClients: Client[]) {
  for (let a = 0; a < searchingClients.length - 1; a++) {
    for (let b = a + 1; b < searchingClients.length; b++) {
      const userA: IUser | null = await User.findById(searchingClients[a].userId);
      const userB: IUser | null = await User.findById(searchingClients[b].userId);

      console.log(searchingClients);

      if (
        userA === null ||
        userB === null ||
        userA.latitude === undefined ||
        userB.latitude === undefined ||
        userA.longitude === undefined ||
        userB.longitude === undefined
      ) {
        console.error('Users data was invalid while searching pair. Continuing search.');
        continue;
      }

      const dist = distance(userA.latitude, userB.latitude, userA.longitude, userB.longitude);

      if (dist <= searchingClients[a].radius && dist <= searchingClients[b].radius) {
        const firstUserId = searchingClients[a].userId;
        const secondUserId = searchingClients[b].userId;
        const chatRoomId = firstUserId + secondUserId;

        searchingClients[a].socket.join(chatRoomId);
        searchingClients[b].socket.join(chatRoomId);

        sendChatRoomFoundEvent(searchingClients[a].socket, chatRoomId, dist);
        sendChatRoomFoundEvent(searchingClients[b].socket, chatRoomId, dist);

        _.remove(searchingClients, (client: Client) => {
          return client.userId !== firstUserId;
        });

        _.remove(searchingClients, (client: Client) => {
          return client.userId !== secondUserId;
        });

        printRemainingUsers(searchingClients);

        return;
      }
    }
  }
  printRemainingUsers(searchingClients);
}

export function printRemainingUsers(searchingClients: Client[]) {
  if (searchingClients.length === 0) {
    return;
  }
  console.log('Ieskantys partneriu vartotojai: ');
  searchingClients.forEach((client: Client) => {
    console.log('--------------');
    console.log(client.userId);
    console.log(client.radius + 'km');
  });
}

function distance(lat1: number, lat2: number, lon1: number, lon2: number) {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  // Haversine formula
  const dlon = lon2 - lon1;
  const dlat = lat2 - lat1;
  const a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
  const c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers.
  const r = 6371;

  // calculate the result
  return c * r;
}
