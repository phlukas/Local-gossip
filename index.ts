const express = require('express');
const app = express();
const { createServer } = require('http');
const { Server } = require('socket.io');
const httpServer = createServer(app);
const port = process.env.PORT || 5000;
const user = require('./routers/user.router');
const message = require('./routers/message.router');
import { Client, MesssageModel, SearchingModel } from './types';
import { findPairAsync, printRemainingUsers, sendMessage } from './utilities';
const mongoose = require('mongoose');
import { chatRoomEventGroup, messageEvent, userEventGroup } from './constants';
var _ = require('lodash');

const databaseUrl = 'mongodb+srv://ZrEqDkEqlf:WGfpHdhNOl@cluster0.fjiti.mongodb.net/main?retryWrites=true&w=majority';

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

mongoose.connect(
  databaseUrl,
  {
    useNewUrlParser: true,
  },
  (err: any) => {
    if (!err) {
      console.log('Connection to the database succeeded');
    } else {
      console.log('Error in connection to database: ' + err);
    }
  }
);

var searchingClients: Client[] = [];

io.on('connection', (socket: any) => {
  socket.on(userEventGroup, (searchingModel: SearchingModel) => {
    searchingClients.push({
      socket: socket,
      userId: searchingModel.userId,
      radius: searchingModel.kilometers,
    });
    findPairAsync(searchingClients);
  });

  socket.on(chatRoomEventGroup, (messageModel: MesssageModel) => {
    if (messageModel.type === messageEvent) {
      console.log('Gauta zinute:');
      console.log(messageModel);
      sendMessage(messageModel, io);
    }
  });

  const interval = setInterval(function () {
    socket.emit('time', Date.now()); // This will be deleted in the near future because it was only created to test front-end
  }, 5000);

  socket.on('disconnect', () => {
    clearInterval(interval); // This will be deleted in the near future because it was only created to test front-end
    _.remove(searchingClients, (client: Client) => {
      return client.socket === socket;
    });
    printRemainingUsers(searchingClients);
  });
});

httpServer.listen(port);

app.use(express.json());

app.use('/user', user);

app.use('/message', message);
