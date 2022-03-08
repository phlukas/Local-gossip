const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const user = require('./routers/user.router');
const mongoose = require('mongoose');

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

app.listen(port, () => {
  console.log('server is started');
});

app.use(express.json());

app.use('/user', user);
