require("dotenv").config({ path: __dirname + "/../variables.env" });
const fs = require("fs");
const keys = require("../config/keys");
const mongoose = require("mongoose");
mongoose.connect(keys.mongodb.dbURI);

// import all of our models - they need to be imported only once
const Hotel = require("../models/Hotels");
const Flights = require("../models/Flights");
const Trips = require("../models/Trips");

const hotels = JSON.parse(fs.readFileSync(__dirname + "/hotels.json", "utf-8"));
console.log(hotels);
// const reviews = JSON.parse(
//   fs.readFileSync(__dirname + '/reviews.json', 'utf-8')
// );
// const users = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'utf-8'));

// async function deleteData() {
//   console.log("😢😢 Goodbye Data...");
//   await Store.remove();
//   await Review.remove();
//   console.log(
//     "Data Deleted. To load sample data, run\n\n\t npm run sample\n\n"
//   );
//   process.exit();
// }

// async function loadData() {
//   try {
//     await Store.insertMany(stores);
//     // await Review.insertMany(reviews);
//     // await User.insertMany(users);
//     console.log("👍👍👍👍👍👍👍👍 Done!");
//     process.exit();
//   } catch (e) {
//     console.log(
//       "\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n"
//     );
//     console.log(e);
//     process.exit();
//   }
// }
// if (process.argv.includes("--delete")) {
//   deleteData();
// } else {
//   loadData();
// }
