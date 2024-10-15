// Helper Methods:
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/userModel.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import bcryptjs from "bcryptjs";

// Controllers:
const signoutUser = asyncHandler(async (req, res) => {
  try {
    return res
      .clearCookie("accessToken")
      .status(200)
      .json(new ApiResponse(200, {}, "User Delete Successfully"));
  } catch (error) {
    throw new ApiError(400, `User cannot Signout Server Error ${error}`);
  }
});

const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) {
      throw new ApiError(400, `User cannot Get`);
    }
    return res
      .status(201)
      .json(new ApiResponse(200, { user }, "User Get Successfully"));
  } catch (error) {
    throw new ApiError(400, `User cannot Get Server Error ${error}`);
  }
});

export { signoutUser, getUser };
