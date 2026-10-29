import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./Database/db.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./Routes/user.routes.js";
import noteRouter from "./Routes/notes.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares - CORS configured for Vercel, Render & Localhost
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:5000",
];

if (process.env.Frontend_URL) {
  process.env.Frontend_URL.split(",").forEach((u) => {
    const cleaned = u.trim().replace(/\/$/, "");
    if (cleaned && !allowedOrigins.includes(cleaned)) {
      allowedOrigins.push(cleaned);
    }
  });
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      const cleanOrigin = origin.replace(/\/$/, "");
      if (
        allowedOrigins.includes(cleanOrigin) ||
        cleanOrigin.endsWith(".vercel.app") ||
        cleanOrigin.endsWith(".onrender.com") ||
        cleanOrigin.includes("localhost")
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/Img", express.static(path.join(__dirname, "public/Img")));

// Database connection
connectDB();

// Root & Health Check endpoints (Essential for Render & Uptime monitors)
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    app: "WordLoom Backend API",
    message: "Server is running smoothly",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Routes
app.use("/iNotebook/user", userRouter);
app.use("/iNotebook/Notes", noteRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || err.statuscode || (res.statusCode >= 400 ? res.statusCode : 500);
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    statusCode,
    success: false,
    message,
    errors: err.errors || []
  });
});

// Server listening
app.listen(PORT, () => {
  console.log(`WordLoom server is running on port ${PORT}`);
});
