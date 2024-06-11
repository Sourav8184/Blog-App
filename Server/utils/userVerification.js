import asyncHandler from "./asyncHandler.js";
import ApiError from "./ApiError.js";
import JWT from "jsonwebtoken";
import User from "../models/userModel.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Token undefined Unauthorized request");
    }

    const decodedToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?.id).select("-password");

    if (!user) {
      throw new ApiError(401, "Invalid Access Token user not found");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});
