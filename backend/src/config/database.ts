import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/coverly";

export const db = mongoose.connection;

export const connectDB = async () => {
  try {
    console.log("\x1b[34m%s\x1b[0m", "trying to connect...");
    await mongoose.connect(MONGODB_URI);
    console.log("\x1b[32m%s\x1b[0m", "Connected to MongoDB");
  } catch (error) {
    console.log("\x1b[31m%s\x1b[0m", "MongoDB connection error:", error);
    process.exit(1);
  }
};

export const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("\x1b[34m%s\x1b[0m", "MongoDB connection closed");
  } catch (error) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "Error closing MongoDB connection:",
      error,
    );
  }
};
