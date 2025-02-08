import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import solanaConnection from "./config/solanaConfig.js";
import auditRoutes from "./routes/auditRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import solanaRoutes from "./routes/solanaRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { initWebSocket } from "./utils/websockets.js";

// 📌 Load environment variables
dotenv.config();

// 📌 Connect to MongoDB
connectDB();

// 📌 Initialize Express App
const app = express();

// 📌 Middleware
app.use(express.json());
app.use(cors());

// 📌 API Routes
app.use("/api/audits", auditRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/solana", solanaRoutes);

// 📌 Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// 📌 Start Server & WebSocket
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);

// 📌 Initialize WebSocket Server
initWebSocket(server);
