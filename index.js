const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const Test = require('./models/test.model');

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

app.get('/', (req, res) => {
  var test = new Test();
  test.name = 'Vardenis';
  test.email = 'abc@abc.lt';
  test.save((err, doc) => {
    if (err) {
      console.log('Cannnot save test model');
    } else {
      res.send(test);
    }
  });
});
