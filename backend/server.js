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

// Middlewares
app.use(cors({
  origin: process.env.Frontend_URL || "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/Img", express.static(path.join(__dirname, "public/Img")));

// Database connection
connectDB();

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
  console.log(`Server is running on http://localhost:${PORT}`);
});
