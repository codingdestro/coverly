import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { closeDB, connectDB } from "./config/database";
import { errorHandler } from "./middleware/errorHandler";
import userRoutes from "./routes/user";
import deepseekRoutes from "./routes/deepseek";
import userDetailsRoutes from "./routes/userDetails";
// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/", userRoutes);
app.use("/api/deepseek", deepseekRoutes);
app.use("/api/userDetails", userDetailsRoutes);
// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB
connectDB();

// Start server

const shutdownServer = async () => {
  console.log("\x1b[31m%s\x1b[0m", "Shutting down server...");
  await closeDB();
  process.exit(0);
};

process.on("SIGINT", shutdownServer);

process.on("SIGTERM", shutdownServer);

process.on("SIGQUIT", shutdownServer);

process.on("SIGKILL", shutdownServer);

process.on("SIGTERM", shutdownServer);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
