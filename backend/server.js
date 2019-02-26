const express = require("express");
const server = express();
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const passport = require("passport");
const bodyParser = require("body-parser");

server.get("/", (req, res) => {
  res.send("Lambda sky ☁️☁️☁️");
});

// Initialize cookie and passport

server.use(
  cookieSession({
    maxAge: 8640000, // 1 day in milliseconds
    keys: [keys.session.cookieKey]
  })
);
// Exposes a bunch of methods for validating data. Used heavily on userController.validateRegister
server.use(expressValidator());

// populates req.cookies with any cookies that came along with the request
// server.use(cookieParser());
// server.use(express.json());

// server.use(
//   session({
//     secret: keys.SECRET,
//     key: keys.KEY,
//     resave: false,
//     saveUninitialized: false,
//     store: new MongoStore({ mongooseConnection: mongoose.connection })
//   })
// );

// Body parser middleware
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use(passport.initialize());
server.use(passport.session());

server.get("/", (req, res) => {
  res.send("Lambda sky ☁️☁️☁️");
});
module.exports = server;
