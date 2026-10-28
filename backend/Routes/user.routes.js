import express from "express";
import { body, validationResult } from "express-validator";
import {
  UserRegister,
  UserLogin,
  UserLogout,
  getUser,
  UploadImage,
} from "../Controller/user.controller.js";
import { Auth } from "../middleware/Authuser.js";
import upload from "../middleware/multer.js";
import { ApiError } from "../Utils/Apierror.js";

const userRouter = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg, errors.array());
  }
  next();
};

userRouter.post(
  "/register",
  [
    body("email").trim().isEmail().withMessage("Please enter a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("phone")
      .trim()
      .matches(/^\d{10}$/)
      .withMessage("Please enter a valid 10-digit phone number"),
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("username").trim().notEmpty().withMessage("Username is required"),
  ],
  validate,
  UserRegister
);

userRouter.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Please enter a valid email address"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  UserLogin
);

// Protected: Auth MUST execute before file upload
userRouter.post("/uploadImage", Auth, upload.single("profilePic"), UploadImage);

// Get authenticated user info
userRouter.get("/getuser", Auth, getUser);
userRouter.post("/getuser", Auth, getUser); // Kept for backward compatibility

userRouter.post("/logout", UserLogout);

export default userRouter;
