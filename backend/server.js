import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/db.js";
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.Frontend_URL, 
  credentials: true 
}));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());
app.use('/Img', express.static(path.join(__dirname, 'public/Img')));
app.use(express.urlencoded({ extended: true }));

dotenv.config();

//connection to MongoDB
connectDB();

//Routes

import userRouter from "./Routes/user.routes.js";
import noteRouter from "./Routes/notes.routes.js";

app.use("/iNotebook/user", userRouter);
app.use("/iNotebook/Notes", noteRouter);


//Server listening
app.listen(PORT, () => {
  // console.log(`Server is running on  http://localhost:${PORT}`)
}); 

