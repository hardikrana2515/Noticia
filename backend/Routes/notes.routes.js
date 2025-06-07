import express from "express";
import {
  getallNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../Controller/notes.controller.js";
import { Auth } from "../middleware/Authuser.js";
const noteRouter = express.Router();

noteRouter.get("/notes", Auth, getallNotes);
noteRouter.post("/create", Auth, createNote);
noteRouter.put("/updateNote/:id", Auth, updateNote);
noteRouter.delete("/deletenote/:id", Auth, deleteNote);

export default noteRouter;
