import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Email is invalid"],
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

userschema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY || "7d",
  });
  return token;
};

// Backward-compatibility alias for typo
userschema.methods.ganerateAuthToken = userschema.methods.generateAuthToken;

userschema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userschema.statics.hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

const User = mongoose.model("User", userschema);
export default User;
