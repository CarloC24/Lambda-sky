const express = require("express");
const server = express();
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const mongoose = require("mongoose");
const session = require("express-session");
const expressValidator = require("express-validator");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
require("./config/passport-config");

// Initialize cookie and passport

// server.use(cookieSession({
//   maxAge: 8640000, // 1 day in milliseconds
//   keys: [keys.session.cookieKey]
// }));
// Exposes a bunch of methods for validating data. Used heavily on userController.validateRegister
server.use(expressValidator());

// populates req.cookies with any cookies that came along with the request
server.use(cookieParser());
server.use(express.json());

server.use(
  session({
    secret: keys.SECRET,
    key: keys.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

server.use(passport.initialize());
server.use(passport.session());

server.get("/", (req, res) => {
  res.send("Lambda sky ☁️☁️☁️");
});
module.exports = server;
