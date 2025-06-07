import express from "express";
import { body } from "express-validator";
import {
  UserRegister,
  UserLogin,
  UserLogout,
  getUser,
  UploadImage
} from "../Controller/user.controller.js";
import { Auth } from "../middleware/Authuser.js";
import upload from "../middleware/multer.js"
const userRouter = express.Router();

userRouter.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("phone")
      .isMobilePhone()
      .withMessage("Please enter a valid phone number"),
    body("name").notEmpty().withMessage("Name is required"),
    body("username").notEmpty().withMessage("Username is required"),
  ],
  UserRegister
);

userRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
  ],
  UserLogin
);

userRouter.post('/uploadImage', upload.single('profilePic'), Auth, UploadImage);

userRouter.post("/getuser", Auth, getUser);

userRouter.post("/logout", UserLogout);

export default userRouter;
