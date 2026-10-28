import mongoose from "mongoose";
import Note from "../models/notes.model.js";
import { ApiError } from "../Utils/Apierror.js";
import { asyncHandler } from "../Utils/asynchandler.js";
import { ApiResponse } from "../Utils/Apiresponse.js";

const getallNotes = asyncHandler(async (req, res) => {
  // Support filtering between all community blogs and personal blogs
  const filter = req.query.filter === "my" ? { user: req.user._id } : {};
  const notes = await Note.find(filter)
    .populate("user", "name username image")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, notes, "Notes fetched successfully"));
});

const createNote = asyncHandler(async (req, res) => {
  const { title, discription, tag } = req.body;

  if (!title || !discription) {
    throw new ApiError(400, "Please provide both title and description");
  }

  const note = await Note.create({
    title: title.trim(),
    discription: discription.trim(),
    tag: tag ? tag.trim() : "General",
    user: req.user._id,
  });

  const populatedNote = await Note.findById(note._id).populate(
    "user",
    "name username image"
  );

  return res
    .status(201)
    .json(new ApiResponse(201, populatedNote, "Note successfully created"));
});

const updateNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, discription, tag } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid note ID format");
  }

  const note = await Note.findById(id);
  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  const noteAuthorId = note.user?._id
    ? note.user._id.toString()
    : note.user.toString();

  if (noteAuthorId !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized to update this note");
  }

  if (title === undefined && discription === undefined && tag === undefined) {
    throw new ApiError(400, "Please provide at least one field to update");
  }

  const updateFields = {};
  if (title !== undefined) updateFields.title = title.trim();
  if (discription !== undefined) updateFields.discription = discription.trim();
  if (tag !== undefined) updateFields.tag = tag.trim();

  const updatedNote = await Note.findByIdAndUpdate(
    id,
    { $set: updateFields },
    { new: true, runValidators: true }
  ).populate("user", "name username image");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedNote, "Note updated successfully"));
});

const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid note ID format");
  }

  const note = await Note.findById(id);
  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  const noteAuthorId = note.user?._id
    ? note.user._id.toString()
    : note.user.toString();

  if (noteAuthorId !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized to delete this note");
  }

  await Note.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, { id }, "Note removed successfully"));
});

export { getallNotes, createNote, updateNote, deleteNote };
