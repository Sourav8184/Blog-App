// Helper Methods:
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/userModel.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import bcryptjs from "bcryptjs";

/*
// Email validation function:
function validateEmail(email) {
  const emailParts = email.split("@");
  return (
    emailParts.length === 2 &&
    emailParts[0] !== "" &&
    emailParts[1] === "gmail.com"
  );
}
*/

// Controllers:
const update = asyncHandler(async (req, res) => {
  if (req.user.id !== req.params.userId) {
    throw new ApiError(403, "You are not allowed to update this user");
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      throw new ApiError(400, "Password must be at least 6 characters");
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      throw new ApiError(400, "Username must be between 7 and 20 characters");
    }

    if (req.body.username.includes(" ")) {
      throw new ApiError(400, "Username cannot contain spaces");
    }

    if (req.body.username !== req.body.username.toLowerCase()) {
      throw new ApiError(400, "Username must be lowercase");
    }

    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      throw new ApiError(400, "Username can only contain letters and numbers");
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const loggedInUser = await User.findById(updatedUser._id).select(
      "-password"
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
        },
        "User Update Successfully"
      )
    );
  } catch (error) {
    throw new ApiError(400, "Something went wrong while Update the user");
  }
});

export { update };
