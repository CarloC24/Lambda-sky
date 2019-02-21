const server = require('./server');
const port = process.env.PORT || 9000;
const mongoose = require('mongoose');
const keys = require('./config/keys');

const passportConfig = require('./config/passport-config');

const users = require('./routes/AuthRoutes')

mongoose.connect(keys.mongodb.dbURI);
mongoose.connection.once('open', () => {
  console.log('connected to the database');
});

// Use Routes

server.use('/auth', users)


mongoose.connection.on('error', () => {
  console.log('big error');
});
server.listen(port, () => {
  console.log('Lambda ☁️ ');
});
