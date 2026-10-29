import express from "express";
import { body, validationResult } from "express-validator";
import {
  UserRegister,
  UserLogin,
  UserLogout,
  getUser,
  UploadImage,
  UpdatePassword,
  UpdateProfile,
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

// Password policy validators (reused for register & update)
const passwordValidators = [
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[@#$&]/)
    .withMessage("Password must contain at least one special character (@#$&)"),
];

userRouter.post(
  "/register",
  [
    body("email").trim().isEmail().withMessage("Please enter a valid email address"),
    ...passwordValidators,
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

// Update profile info (name, email, phone, username) — requires auth
userRouter.put(
  "/updateProfile",
  Auth,
  [
    body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
    body("email").optional().trim().isEmail().withMessage("Please enter a valid email address"),
    body("phone")
      .optional()
      .trim()
      .matches(/^\d{10}$/)
      .withMessage("Please enter a valid 10-digit phone number"),
    body("username").optional().trim().notEmpty().withMessage("Username cannot be empty"),
  ],
  validate,
  UpdateProfile
);

// Update password — requires auth
userRouter.put(
  "/updatePassword",
  Auth,
  [
    body("currentPassword").notEmpty().withMessage("Current password is required"),
    body("newPassword")
      .isLength({ min: 8 })
      .withMessage("New password must be at least 8 characters long")
      .matches(/[A-Z]/)
      .withMessage("New password must contain at least one uppercase letter")
      .matches(/[0-9]/)
      .withMessage("New password must contain at least one number")
      .matches(/[@#$&]/)
      .withMessage("New password must contain at least one special character (@#$&)"),
  ],
  validate,
  UpdatePassword
);

export default userRouter;
