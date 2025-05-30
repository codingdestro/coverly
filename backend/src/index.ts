import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { closeDB, connectDB } from "./config/database";
import { errorHandler } from "./middleware/errorHandler";
import userRoutes from "./routes/user";
import deepseekRoutes from "./routes/deepseek";
import userDetailsRoutes from "./routes/userDetails";
import staticRoutes from "./routes/static";
import userDocuments from "./routes/userFiles";
// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", staticRoutes);
app.use("/api/", userRoutes);
app.use("/api/deepseek", deepseekRoutes);
app.use("/api/userDetails", userDetailsRoutes);
app.use("/api/documents", userDocuments);
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
