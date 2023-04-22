import { Socket } from 'socket.io';
import { Client, SearchingModel } from '../../types';
import { IUser, User } from '../../models/user.model';
import sendChatRoomFoundEvent from '../outgoingEvents/chatRoomFound.event';
import _ from 'lodash';
import { chatRoomNotFoundEvent } from '../../eventConstants';
import cancelSearchingEvent from './cancelSearching.event';
import { ChatRoom, IChatRoom } from '../../models/chatRoom.model';

export default async (socket: Socket, searchingClients: Client[], searchingModel: SearchingModel) => {
  searchingClients.push({
    socket: socket,
    userId: searchingModel.userId,
    radius: searchingModel.kilometers,
  });

  const foundPartner = await findPairAsync(searchingClients);

  if (!foundPartner) {
    setTimeout(() => {
      console.log(`Partner for socket ${socket.id} not found.`);
      cancelSearchingEvent(searchingClients, searchingModel);
      socket.emit(chatRoomNotFoundEvent);
    }, 10000);
  }
};

async function findPairAsync(searchingClients: Client[]): Promise<boolean> {
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
        const chatRoom = new ChatRoom();
        chatRoom.dateCreated = Date.now();

        chatRoom.save(
          (
            err,
            res: IChatRoom & {
              _id: string;
            }
          ) => {
            if (err) {
              console.error('Cannnot save chatRoom: ' + err);
            } else {
              searchingClients[a].socket.join(res._id);
              searchingClients[b].socket.join(res._id);

              sendChatRoomFoundEvent(searchingClients[a].socket, res._id, dist);
              sendChatRoomFoundEvent(searchingClients[b].socket, res._id, dist);

              _.remove(searchingClients, (client: Client) => {
                return client?.userId === searchingClients[a]?.userId;
              });

              _.remove(searchingClients, (client: Client) => {
                return client?.userId === searchingClients[b]?.userId;
              });

              printRemainingUsers(searchingClients);

              return true;
            }
          }
        );

        return false;
      }
    }
  }
  printRemainingUsers(searchingClients);
  return false;
}

export function printRemainingUsers(searchingClients: Client[]) {
  if (searchingClients.length === 0) {
    console.log('Searching clients list is empty.');
    return;
  }
  console.log('Searching clients: ');
  searchingClients.forEach((client: Client) => {
    console.log(`ClientId: ${client.userId}\nSocketId: ${client.socket.id}\nRadius: ${client.radius} km`);
  });
}

function distance(lat1: number, lat2: number, lon1: number, lon2: number) {
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  const dlon = lon2 - lon1;
  const dlat = lat2 - lat1;
  const a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
  const c = 2 * Math.asin(Math.sqrt(a));
  const r = 6371;

  return c * r;
}
