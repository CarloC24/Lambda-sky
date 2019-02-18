const server = require('./server');
const port = process.env.PORT || 9000;
const mongoose = require('mongoose');

mongoose.connect('mongodb://carlo:carloc1@ds111622.mlab.com:11622/lambda-sky');
mongoose.connection.once('open', () => {
  console.log('connected to the database');
});

mongoose.connection.on('error', () => {
  console.log('big error');
});
server.listen(port, () => {
  console.log('Lambda ☁️ ');
});
