const server = require("./server");
const port = process.env.PORT || 9000;
const mongoose = require("mongoose");
const keys = require("./config/keys");

const passport = require("passport");
// Passport middleware
server.use(passport.initialize());
server.use(passport.session());
// Passport config
require('./config/passport-config')(passport);

const AuthRoutes = require("./routes/AuthRoutes");
const UserRoutes = require("./routes/UsersRoutes");
const ProfileRoutes = require("./routes/ProfileRoutes");
const HotelsRouter = require("./routes/HotelsRouter");
const TripsRouter = require("./routes/TripsRouter");
const CarRentalsRoutes = require("./routes/CarRentalsRoutes");
const FlightsRouter = require("./routes/FlightsRoutes");

mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true });
mongoose.connection.once("open", () => {
  console.log("connected to the database");
});

// Server.use routes

server.use("/auth", AuthRoutes);
server.use("/users", UserRoutes);
server.use("/profile", ProfileRoutes);
server.use("/hotel", HotelsRouter);
server.use("/trips", TripsRouter);
server.use("/flights", FlightsRouter);
server.use("/carRental", CarRentalsRoutes);

mongoose.connection.on("error", () => {
  console.log("big error");
});
server.listen(port, () => {
  console.log("Lambda ☁️ ");
});
