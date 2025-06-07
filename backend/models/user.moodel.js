import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "is invalid"],
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/\d{10}/, "is invalid"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    image:{
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

userschema.methods.ganerateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
  return token;
};

userschema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userschema.statics.hashPassword = async (password) => {
  const hashPassword = await bcrypt.hash(password, 12);
  return hashPassword;
};

const User = mongoose.model("User", userschema);
export default User;
