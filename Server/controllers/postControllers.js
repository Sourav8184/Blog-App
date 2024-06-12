import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import postModel from "../models/postModel.js";

export const create = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    throw new ApiError(403, "You are not allowed to create a post");
  }

  if (!req.body.title || !req.body.content) {
    throw new ApiError(400, "Please provide all required fields");
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const newPost = await postModel.create({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savedPost = await newPost.save();

    return res
      .status(201)
      .json(new ApiResponse(200, { savedPost }, "Post created Successfully"));
  } catch (error) {
    throw new ApiError(400, `Post not Created Server error ${error}`);
  }
});
