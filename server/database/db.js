const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = () => {
  const connectionParams = { useNewUrlParser: true };
    mongoose.connect(process.env.API_URL);

  mongoose.connection.on("connected", () => {
    console.log("--------->connected database successfully<---------");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error occured", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Connection disconnected");
  });
};

module.exports = dbConnect;
