import { ApiError } from "../Utils/Apierror.js";
import { asyncHandler } from "../Utils/asynchandler.js";
import User from "../models/user.moodel.js";
import { ApiResponse } from "../Utils/Apiresponse.js";
import Mail from "../Utils/sendMail.js"
import mailHtmlRes from "../public/mail/htmlMail.js"

const UserRegister = asyncHandler(async (req, res) => {
  const { name, username, email, password, phone } = req.body;
  if (!name || !username || !email || !password || !phone) {
    res.status(400);
    throw new ApiError(400, "Please fill all the fields");
  }
  const registeredUser = await User.findOne({ email, phone });

  if (registeredUser) {
    res.status(400);
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
     let html = mailHtmlRes(name,username,password)
    let msg = `Hi ${name},\nThank you for using our services.👍\n\n
                your Usernamr 👤: ${username} \n
                     password 🔑: ${password} \n
                     
                     We hope our services helpful for you.🫂`

  Mail(email,"Wlcome To Noticia",msg,html)

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfully"));
});

const UserLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new ApiError(400, "Please fill all the fields");
  }

  const userExist = await User.findOne({email});

  if (!userExist) {
    res.status(400);
    throw new ApiError(400, "User not found, please register");
  }

  const existingToken = req.cookies?.token;
  if (existingToken) {
    try {
      return res.status(204)
                .json(new ApiResponse(204,existingToken,"User already logged in."))
    } catch (err) {
      console.error(`Token verification error`);
       throw new ApiError(500,"Internal server error")
    }
  }

  const user = await User.findOne({email}).select("+password");

  if (!user) {
    res.status(400);
    throw new ApiError(400, "User not found, please register");
  }

  // console.log(user.password);
  const isCorrect = await user.comparePassword(password);
  if (!isCorrect) {
    res.status(400);
    throw new ApiError(400, "Incorrect password");
  }

  const token = user.ganerateAuthToken();
  res.cookie("token", token, { httpOnly: true });
  return res
    .status(200)
    .json(new ApiResponse(200, { user, token }, "User logged in successfully"));
});

const getUser = asyncHandler(async (req, res) => {
  const user = req.user;
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User Fetched Succesfully"));
});

const UserLogout = asyncHandler(async (req, res) => {
  const authHeader = req.header("authorization");
  const tokenFromHeader = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

     const token = req.cookies?.token || tokenFromHeader;

  if (!token) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "User not logged in"));
  }

  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "lax",
    path: "/", 
  });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "User logged out successfully"));
});

const UploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(401, "Please first select file!");
  }
  // console.log(req.body)
  // console.log("Uploaded file:", req.file);

  const imageUrl = `/Img/${req.file.filename}`;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {image : imageUrl },
    {new : true }
  )
    if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { imageUrl,user }, "Image uploaded successfully"));
});
export { UserRegister, UserLogin, UserLogout, getUser ,UploadImage};
