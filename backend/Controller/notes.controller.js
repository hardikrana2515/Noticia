import mongoose from "mongoose";
import Note from "../models/notes.model.js";
import { ApiError } from "../Utils/Apierror.js";
import { asyncHandler } from "../Utils/asynchandler.js";
import { ApiResponse } from "../Utils/Apiresponse.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../Utils/cloudinary.js";

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

  // Handle uploaded image (if any)
  let imageUrl = "";
  if (req.file) {
    const cloudinaryResult = await uploadOnCloudinary(req.file.path, "noticia/blogs");
    if (cloudinaryResult && cloudinaryResult.secure_url) {
      imageUrl = cloudinaryResult.secure_url;
    } else {
      throw new ApiError(500, "Failed to upload blog image to Cloudinary");
    }
  }

  const trimmedTitle = title ? title.trim() : "";
  const trimmedDiscription = discription ? discription.trim() : "";

  // User can post:
  // 1. Text blog (title & content)
  // 2. Blog with banner image (image + title + content)
  // 3. Image-only blog (image with optional title/caption)
  if (!imageUrl && !trimmedTitle && !trimmedDiscription) {
    throw new ApiError(400, "Please provide an image, or a title and content for your blog");
  }

  if (!imageUrl && (!trimmedTitle || !trimmedDiscription)) {
    throw new ApiError(400, "Please provide both title and description if no image is uploaded");
  }

  const note = await Note.create({
    title: trimmedTitle || (imageUrl ? "Untitled Photo Note" : "Untitled Note"),
    discription: trimmedDiscription,
    tag: tag ? tag.trim() : "General",
    image: imageUrl,
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
  const { title, discription, tag, removeImage } = req.body;

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

  const updateFields = {};
  if (title !== undefined) updateFields.title = title.trim();
  if (discription !== undefined) updateFields.discription = discription.trim();
  if (tag !== undefined) updateFields.tag = tag.trim();

  // Handle image update or removal
  if (req.file) {
    const cloudinaryResult = await uploadOnCloudinary(req.file.path, "noticia/blogs");
    if (cloudinaryResult && cloudinaryResult.secure_url) {
      // If previous image was in Cloudinary, delete old one
      if (note.image && note.image.includes("cloudinary.com")) {
        deleteFromCloudinary(note.image).catch((err) =>
          console.error("Failed to delete previous blog image from Cloudinary:", err)
        );
      }
      updateFields.image = cloudinaryResult.secure_url;
    }
  } else if (removeImage === "true" || removeImage === true) {
    if (note.image && note.image.includes("cloudinary.com")) {
      deleteFromCloudinary(note.image).catch((err) =>
        console.error("Failed to delete removed blog image from Cloudinary:", err)
      );
    }
    updateFields.image = "";
  }

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

  // Delete image from Cloudinary if present
  if (note.image && note.image.includes("cloudinary.com")) {
    deleteFromCloudinary(note.image).catch((err) =>
      console.error("Failed to delete note image from Cloudinary:", err)
    );
  }

  await Note.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, { id }, "Note removed successfully"));
});

export { getallNotes, createNote, updateNote, deleteNote };
