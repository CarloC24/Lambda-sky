const express = require('express');
const server = express();
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
require('./config')

server.get('/', (req, res) => {
  res.send('Lambda sky ☁️☁️☁️');
});

// Initialize cookie and passport

// server.use(cookieSession({
//   maxAge: 8640000, // 1 day in milliseconds
//   keys: [keys.session.cookieKey]
// }));
// Exposes a bunch of methods for validating data. Used heavily on userController.validateRegister
app.use(expressValidator());

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

server.use(passport.initialize());
server.use(passport.session());

module.exports = server;
