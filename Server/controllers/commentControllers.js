import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import commentModel from "../models/commentModel.js";

export const createComment = asyncHandler(async (req, res) => {
  try {
    const { content, postId, userId } = req.body;

    if (req.user.id !== userId) {
      throw new ApiError(403, "You are not allowed to write the post");
    }

    const comment = await commentModel.create({
      userId,
      postId,
      content,
    });

    return res
      .status(201)
      .json(
        new ApiResponse(200, { comment }, "Comment is created Successfully")
      );
  } catch (error) {
    throw new ApiError(403, "Something went wrong while write the comment");
  }
});
