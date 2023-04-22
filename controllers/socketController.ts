import { Client, MesssageModel, SearchingModel } from '../types';
import sendMessage from '../socketEvents/chatRoomEventGroup/incomingEvents/messageEvent';
import { chatRoomEventGroup, messageEvent, startSearchingEvent } from '../eventConstants';
import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import startSearching from '../socketEvents/userEventGroup/incomingEvents/startSearchingEvent';
// import cancelSearching from '../socketEvents/userEventGroup/incomingEvents/cancelSearchingEvent';
import disconnectEvent from '../socketEvents/disconnectEvent';

export default (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  const searchingClients: Client[] = [];

  io.on('connection', (socket: Socket) => {
    console.log(`Socket with ID ${socket.id} connected.`);

    socket.on(startSearchingEvent, (searchingModel: SearchingModel) => {
      startSearching(socket, searchingClients, searchingModel);
    });

    // socket.on(cancelSearchingEvent, (searchingModel: SearchingModel) => {
    //   cancelSearching(searchingClients, searchingModel);
    // });

    socket.on(chatRoomEventGroup, (messageModel: MesssageModel) => {
      if (messageModel.type === messageEvent) {
        sendMessage(messageModel, io, socket);
      }
    });

    socket.on('disconnect', () => {
      disconnectEvent(searchingClients, socket);
    });
  });
};
