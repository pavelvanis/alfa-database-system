const mongoose = require("mongoose");

module.exports = () => {
  // If missing MONGODB_URI, throw error
  if (!process.env.MONGODB_URI)
    throw new Error("MONGODB_URI is missing from .env file");

  // Connect database
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("mongodb is connected...");
    })
    .catch((err) => {
      console.log(err);
    });

  // Handle actions
  mongoose.connection.on("connected", () => {
    console.log("Mongoose db was connected...");
  });

  mongoose.connection.on("error", () => {
    console.log("Error in mongoose...");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose db was disconnected...");
  });

  process.on("SIGINT", async () => {
    await mongoose.disconnect();
    console.log("Disconnected from mongo database");
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    await mongoose.disconnect();
    console.log("Disconnected from mongo database");
    process.exit(0);
  });

  process.on("SIGQUIT", async () => {
    await mongoose.disconnect();
    console.log("Disconnected from mongo database");
    process.exit(0);
  });
};
