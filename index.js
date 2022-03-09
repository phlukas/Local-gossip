const express = require('express');
const app = express();
const { createServer } = require('http');
const { Server } = require('socket.io');
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'https://amritb.github.io',
  },
});
const port = process.env.PORT || 5000;
const user = require('./routers/user.router');
const mongoose = require('mongoose');
const { GetUser } = require('./services/user.service');

const url = 'mongodb+srv://ZrEqDkEqlf:WGfpHdhNOl@cluster0.fjiti.mongodb.net/main?retryWrites=true&w=majority';

mongoose.connect(
  url,
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (!err) {
      console.log('Connection to the database succeeded');
    } else {
      console.log('Error in connection to database: ' + err);
    }
  }
);

var searchingClients = [];

io.on('connection', (socket) => {
  socket.on('searching', (userId, kilometers) => {
    searchingClients.push({ socketId: socket.id, userId: socket.id, radius: kilometers });
    console.log(userId);
    console.log(kilometers);
    console.log(searchingClients);
    FindPair();
  });
});

httpServer.listen(port);

app.use(express.json());

app.use('/user', user);

function FindPair(socket) {
  for (var a = 0; a < searchingClients.length - 1; a++) {
    for (var b = a + 1; b < searchingClients.length; b++) {
      let userA = GetUser(searchingClients[a].userId);
      let userB = GetUser(searchingClients[b].userId);
      let dist = distance(userA.Latitude, userB.Latitude, userA.Longitude, userB.Longitude);
      if (dist <= searchingClients[a].radius && dist <= searchingClients[b].radius) {
        io.to(searchingClients[a].socketId).emit('test', 'match');
        io.to(searchingClients[b].socketId).emit('test', 'match');
      }
    }
  }
}

function distance(lat1, lat2, lon1, lon2) {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956 for miles
  let r = 6371;

  // calculate the result
  return c * r;
}
