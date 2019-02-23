const server = require("./server");
const port = process.env.PORT || 9000;
const mongoose = require("mongoose");
const keys = require("./config/keys");

const passportConfig = require("./config/passport-config");

const AuthRoutes = require("./routes/AuthRoutes");
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
