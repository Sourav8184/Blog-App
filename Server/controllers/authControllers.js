import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js ";

import bcryptjs from "bcryptjs";

import { generateRandomPassword } from "../utils/GenerateRandomPassword.js";

const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if ([username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All field are required! ");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  const hashPassword = bcryptjs.hashSync(password, 16);

  const user = await User.create({
    email,
    password: hashPassword,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering the user");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, createdUser, "User Registered Successfully"));
});

const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({
    $or: [{ email }],
  });

  if (!user) {
    throw new ApiError(404, "User Not Found ");
  }

  const validPassword = bcryptjs.compareSync(password, user.password);

  if (!validPassword) {
    throw new ApiError(401, "Password is incorrect");
  }

  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );

  const loggedInUser = await User.findById(user._id).select("-password");

  const optionsForCookieNotChangeByFrontend = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, optionsForCookieNotChangeByFrontend)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
        },
        "User loggedIn Successfully"
      )
    );
});

const googleSignIn = asyncHandler(async (req, res) => {
  const { name, email, googlePhotoUrl } = req.body;
  console.log("1");
  const existedUser = await User.findOne({
    $or: [{ email }],
  });
  console.log("2");
  if (existedUser) {
    // if user is already Signup:
    // Generate a access token
    console.log("3");
    const accessToken = jwt.sign(
      { id: existedUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
    console.log("4");
    // find user and hide password:
    const loggedInUser = await User.findById(existedUser._id).select(
      "-password"
    );
    console.log("5");
    const optionsForCookieNotChangeByFrontend = {
      httpOnly: true,
      secure: true,
    };
    console.log("6");
    return res
      .status(200)
      .cookie("accessToken", accessToken, optionsForCookieNotChangeByFrontend)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
          },
          "User loggedIn Successfully"
        )
      );
  } else {
    console.log("7");
    // if user are not Signup:
    const generatedPassword = generateRandomPassword();
    console.log(generatedPassword);
    console.log("8");
    const hashPassword = bcryptjs.hashSync(generatedPassword, 16);
    console.log("9");
    const newUser = await User.create({
      username:
        name.toLowerCase().split(" ").join("") + generateRandomPassword(),
      email,
      password: hashPassword,
      profilePicture: googlePhotoUrl,
    });
    console.log("10");
    await newUser.save();
    const accessToken = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
    console.log("11");
    // find user and hide password:
    const loggedInUser = await User.findById(newUser._id).select("-password");
    console.log("12");
    const optionsForCookieNotChangeByFrontend = {
      httpOnly: true,
      secure: true,
    };
    console.log("13");
    return res
      .status(200)
      .cookie("accessToken", accessToken, optionsForCookieNotChangeByFrontend)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
          },
          "User loggedIn Successfully"
        )
      );
  }
});

export { signup, signin, googleSignIn };
