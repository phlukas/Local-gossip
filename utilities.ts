import { Client, MesssageModel } from './types';
import { GetUser, UpdateUser } from './services/user.service';
import { chatRoomEventGroup, chatRoomFoundEvent, userEventGroup, messageEvent } from './constants';
import * as _ from 'lodash';

export async function findPairAsync(searchingClients: Client[]) {
  for (let a = 0; a < searchingClients.length - 1; a++) {
    for (let b = a + 1; b < searchingClients.length; b++) {
      const userA: any = await GetUser(searchingClients[a].userId);
      const userB: any = await GetUser(searchingClients[b].userId);
      console.log(userA);
      console.log(userB);
      console.log(searchingClients);
      const dist = distance(userA.latitude, userB.latitude, userA.longitude, userB.longitude);

      if (dist <= searchingClients[a].radius && dist <= searchingClients[b].radius) {
        const firstUserId = searchingClients[a].userId;
        const secondUserId = searchingClients[b].userId;
        const chatRoomId = firstUserId + secondUserId;

        searchingClients[a].socket.join(chatRoomId);
        searchingClients[b].socket.join(chatRoomId);

        searchingClients[a].socket.emit(userEventGroup, {
          type: chatRoomFoundEvent,
          chatRoomId: chatRoomId,
          partnerDistance: dist,
        });
        searchingClients[b].socket.emit(userEventGroup, {
          type: chatRoomFoundEvent,
          chatRoomId: chatRoomId,
          partnerDistance: dist,
        });

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
  console.log('Ieskanciai partneriu vartotojai: ');
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

  // Radius of earth in kilometers. Use 3956 for miles
  const r = 6371;

  // calculate the result
  return c * r;
}

export async function sendMessage(messageModel: MesssageModel, io: any) {
  const user: any = await GetUser(messageModel.userId);
  io.to(user.chatRoomId).emit(chatRoomEventGroup, {
    type: messageEvent,
    userId: messageModel.userId,
    message: messageModel.message,
  });
}