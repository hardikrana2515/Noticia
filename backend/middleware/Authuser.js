import jwt from "jsonwebtoken";
import User from "../models/user.moodel.js";
import { asyncHandler } from "../Utils/asynchandler.js";
import { ApiError } from "../Utils/Apierror.js";

const Auth = asyncHandler(async (req, res, next) => {
  const auth_token = req.cookies?.token || req.header("authorization");

  // console.log(auth_token)
  if (!auth_token) {
    res.status(401);
    throw new ApiError(401, "unauthohrized user!");
  }

  try {
    const decoded = jwt.verify(auth_token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    // console.log(decoded);
    if (!user) {
      throw new ApiError(400, "User not valid for this route");
    }
    req.user = user;
    next();
  } catch {
    throw new ApiError(401, "nvalid or expired token");
  }
});

export { Auth };
