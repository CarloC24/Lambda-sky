const server = require("./server");
const port = process.env.PORT || 9000;
<<<<<<< HEAD
const mongoose = require("mongoose");
const keys = require("./config/keys");
require("./config/passport-config");
const users = require("./routes/AuthRoutes");
const flights = require("./routes/FlightsRoutes");
=======
const mongoose = require('mongoose');
const keys = require('./config/keys');

const passportConfig = require('./config/passport-config');

const AuthRoutes = require('./routes/AuthRoutes')
const ProfileRoutes = require('./routes/ProfileRoutes')
>>>>>>> 28f4364abf3e4cd6df6fa15404afe3b903a346e4

mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true });
mongoose.connection.once("open", () => {
  console.log("connected to the database");
});

// Server.use routes

<<<<<<< HEAD
server.use("/auth", users);
server.use("/flights", flights);
=======
server.use('/auth', AuthRoutes)
server.use('/profile', ProfileRoutes)
>>>>>>> 28f4364abf3e4cd6df6fa15404afe3b903a346e4

mongoose.connection.on("error", () => {
  console.log("big error");
});
server.listen(port, () => {
  console.log("Lambda ☁️ ");
});
