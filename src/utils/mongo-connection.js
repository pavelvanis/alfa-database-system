const mongoose = require("mongoose");

module.exports = () => {
  if (!process.env.MONGODB_URI)
    throw new Error("MONGODB_URI is not defined in .env");

  if (mongoose.connection.readyState !== 1) {
    mongoose.connect(process.env.MONGODB_URI).catch((err) => {
      console.error("Error in MongoDB connection:", err);
    });
  }

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connection is connected");
  });

  mongoose.connection.on("error", (err) => {
    console.error("Error in Mongoose connection:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("Mongoose connection is disconnected");
  });

  const gracefulShutdown = async (signal) => {
    await mongoose.disconnect();
    console.log(`Disconnected from MongoDB database on signal ${signal}`);
    process.exit(0);
  };

  process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGQUIT", () => gracefulShutdown("SIGQUIT"));
};
