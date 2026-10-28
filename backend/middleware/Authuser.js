import jwt from "jsonwebtoken";
import User from "../models/user.moodel.js";
import { asyncHandler } from "../Utils/asynchandler.js";
import { ApiError } from "../Utils/Apierror.js";

const Auth = asyncHandler(async (req, res, next) => {
  const authHeader = req.header("authorization");
  const tokenFromHeader = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  const token = req.cookies?.token || tokenFromHeader;

  if (!token) {
    throw new ApiError(401, "Unauthorized access! Please login to continue.");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new ApiError(401, "Invalid or expired session token!");
  }

  const user = await User.findById(decoded._id);
  if (!user) {
    throw new ApiError(404, "User account not found for this session!");
  }

  req.user = user;
  next();
});

export { Auth };
