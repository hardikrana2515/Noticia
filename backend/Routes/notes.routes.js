import express from "express";
import {
  getallNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../Controller/notes.controller.js";
import { Auth } from "../middleware/Authuser.js";
import upload from "../middleware/multer.js";

const noteRouter = express.Router();

// Allow optional image upload with field name 'image'
noteRouter.get("/notes", Auth, getallNotes);
noteRouter.post("/create", Auth, upload.single("image"), createNote);
noteRouter.put("/updateNote/:id", Auth, upload.single("image"), updateNote);
noteRouter.put("/update/:id", Auth, upload.single("image"), updateNote);
noteRouter.delete("/deletenote/:id", Auth, deleteNote);
noteRouter.delete("/delete/:id", Auth, deleteNote);

export default noteRouter;
