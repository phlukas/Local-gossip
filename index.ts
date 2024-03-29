import express from 'express';
import { createServer } from 'http';
import user from './controllers/userController';
import message from './controllers/messageController';
import chatRoom from './controllers/chatRoomController';
import mongoose from 'mongoose';
import listEndpoints from 'express-list-endpoints';
import socketManager from './controllers/socketController';
import { ChatRoom } from './models/chatRoom.model';

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 5000;

const databaseUrl = 'mongodb+srv://ZrEqDkEqlf:WGfpHdhNOl@cluster0.fjiti.mongodb.net/main?retryWrites=true&w=majority';

mongoose.connect(databaseUrl, {}, (err: unknown) => {
  if (!err) {
    console.log('Connection to the database succeeded');
  } else {
    console.log('Error in connection to database: ' + err);
  }
});

ChatRoom.deleteMany({}, (err: any) => {
  if (err) {
    console.log('Cannot delete rooms. Continuing...');
  }
});

socketManager(httpServer);

httpServer.listen(port);

app.use(express.json());

app.use('/user', user);

app.use('/message', message);

app.use('/chatRoom', chatRoom);

app.route('/').get((req, res) => {
  res.send(listEndpoints(app));
});
