const express = require('express');
const server = express();

server.get('/', (req, res) => {
  res.send('Lambda sky ☁️☁️☁️');
});

module.exports = server;
