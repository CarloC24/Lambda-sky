const express = require('express');
const server = express();
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');
const bodyParser = require('body-parser')

server.get('/', (req, res) => {
  res.send('Lambda sky ☁️☁️☁️');
});

// Initialize cookie and passport

server.use(cookieSession({
  maxAge: 8640000, // 1 day in milliseconds
  keys: [keys.session.cookieKey]
}));

// Body parser middleware
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());


server.use(passport.initialize());
server.use(passport.session());

module.exports = server;
