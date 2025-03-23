import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { closeDB, connectDB } from "./config/database";
import homeRoutes from "./routes/homeRoutes";
import { errorHandler } from "./middleware/errorHandler";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", homeRoutes);

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
