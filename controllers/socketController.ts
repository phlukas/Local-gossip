import { Client, MesssageModel, SearchingModel, updateLocationModel } from '../types';
import sendMessage from '../socketEvents/incomingEvents/message.event';
import {
  acceptGameEvent,
  cancelGameEvent,
  cancelSearchingEvent,
  exitChatRoomEvent,
  messageEvent,
  startGameEvent,
  startSearchingEvent,
  updateLocationEvent,
  freezePlayerEvent,
  invisiblePlayerEvent,
  exitGameEvent,
} from '../eventConstants';
import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import startSearching, { printRemainingUsers } from '../socketEvents/incomingEvents/startSearching.event';
import cancelSearching from '../socketEvents/incomingEvents/cancelSearching.event';
import disconnectEvent from '../socketEvents/disconnect.event';
import exitChatRoom from '../socketEvents/incomingEvents/exitChatRoom.event';
import startGame from '../socketEvents/incomingEvents/startGame.event';
import acceptGame from '../socketEvents/incomingEvents/acceptGame.event';
import cancelGame from '../socketEvents/incomingEvents/cancelGame.event';
import freezePlayer from '../socketEvents/incomingEvents/freezePlayer.event';
import invisiblePlayer from '../socketEvents/incomingEvents/invisiblePlayer.event';
import exitGame from '../socketEvents/incomingEvents/exitGame.event';
import updateLocation from '../socketEvents/incomingEvents/updateLocation.event';

export default (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  const searchingClients: Client[] = [];

  setInterval(() => {
    printRemainingUsers(searchingClients);
  }, 15000);

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

    socket.on(startGameEvent, () => {
      startGame(socket);
    });

    socket.on(acceptGameEvent, () => {
      acceptGame(socket);
    });

    socket.on(cancelGameEvent, () => {
      cancelGame(socket);
    });

    socket.on(updateLocationEvent, (locationModel: updateLocationModel) => {
      updateLocation(socket, locationModel);
    });

    socket.on('disconnect', () => {
      disconnectEvent(searchingClients, socket);
    });

    socket.on(freezePlayerEvent, (user: {userid:string}) => {
      freezePlayer(io, socket, user);
    });

    socket.on(invisiblePlayerEvent, (user: {userid:string}) => {
      invisiblePlayer(io, socket, user);
    });

    socket.on(exitGameEvent, () =>{
      exitGame(socket);
    });

  });
};
