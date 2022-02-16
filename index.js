const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('server is started');
});

app.get('/', (req, res) => {
  res.send('hello world');
});
