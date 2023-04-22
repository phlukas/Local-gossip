import { Client, MesssageModel, SearchingModel } from '../types';
import sendMessage from '../socketEvents/incomingEvents/message.event';
import { cancelSearchingEvent, exitChatRoomEvent, messageEvent, startSearchingEvent } from '../eventConstants';
import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import startSearching from '../socketEvents/incomingEvents/startSearching.event';
import cancelSearching from '../socketEvents/incomingEvents/cancelSearching.event';
import disconnectEvent from '../socketEvents/disconnect.event';
import exitChatRoom from '../socketEvents/incomingEvents/exitChatRoom.event';

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

    socket.on(cancelSearchingEvent, (searchingModel: SearchingModel) => {
      cancelSearching(searchingClients, searchingModel);
    });

    socket.on(messageEvent, (messageModel: MesssageModel) => {
      sendMessage(messageModel, io, socket);
    });

    socket.on(exitChatRoomEvent, () => {
      exitChatRoom(socket, io);
    });

    socket.on('disconnect', () => {
      disconnectEvent(searchingClients, socket);
    });
  });
};
