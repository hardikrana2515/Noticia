import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ApiError } from "../Utils/Apierror.js";
import { asyncHandler } from "../Utils/asynchandler.js";
import User from "../models/user.moodel.js";
import { ApiResponse } from "../Utils/Apiresponse.js";
import Mail from "../Utils/sendMail.js";
import mailHtmlRes from "../public/mail/htmlMail.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UserRegister = asyncHandler(async (req, res) => {
  const { name, username, email, password, phone } = req.body;
  if (!name || !username || !email || !password || !phone) {
    throw new ApiError(400, "Please fill all required fields");
  }

  // Check if user already exists with any unique field
  const existingUser = await User.findOne({
    $or: [{ email }, { phone }, { username }],
  });

  if (existingUser) {
    if (existingUser.email === email) {
      throw new ApiError(400, "An account with this email already exists");
    }
    if (existingUser.username === username) {
      throw new ApiError(400, "This username is already taken");
    }
    if (existingUser.phone === phone) {
      throw new ApiError(400, "This phone number is already registered");
    }
    throw new ApiError(400, "User already registered");
  }

  const hashPassword = await User.hashPassword(password);
  const user = await User.create({
    name,
    username,
    email,
    phone,
    password: hashPassword,
  });

  // Safe user without password
  const safeUser = await User.findById(user._id).select("-password");

  // Send welcome email asynchronously (never include plaintext passwords)
  const html = mailHtmlRes(name, username);
  const msg = `Hi ${name},\n\nWelcome to Noticia! Your account (${username}) has been created successfully.\n\nBest regards,\nThe Noticia Team`;
  Mail(email, "Welcome to Noticia", msg, html).catch((err) =>
    console.error("Email dispatch failed:", err.message)
  );

  return res
    .status(201)
    .json(new ApiResponse(201, safeUser, "User registered successfully"));
});

const UserLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please provide both email and password");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(400, "Invalid email or password");
  }

  const isCorrect = await user.comparePassword(password);
  if (!isCorrect) {
    throw new ApiError(400, "Invalid email or password");
  }

  const token = user.generateAuthToken();

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/",
  });

  const safeUser = await User.findById(user._id).select("-password");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: safeUser, token },
        "User logged in successfully"
      )
    );
});

const getUser = asyncHandler(async (req, res) => {
  const user = req.user;
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));
});

const UserLogout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "User logged out successfully"));
});

const UploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Please select an image file to upload");
  }

  const imageUrl = `/Img/${req.file.filename}`;

  // Find current user to check for previous image cleanup
  const existingUser = await User.findById(req.user._id);
  if (existingUser?.image && existingUser.image.startsWith("/Img/")) {
    const oldFileName = existingUser.image.replace("/Img/", "");
    const oldFilePath = path.join(__dirname, "../public/Img", oldFileName);
    if (fs.existsSync(oldFilePath)) {
      fs.unlink(oldFilePath, (err) => {
        if (err) console.error("Error cleaning up old profile picture:", err);
      });
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { image: imageUrl },
    { new: true }
  ).select("-password");

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { imageUrl, user: updatedUser },
        "Profile picture updated successfully"
      )
    );
});

export { UserRegister, UserLogin, UserLogout, getUser, UploadImage };
