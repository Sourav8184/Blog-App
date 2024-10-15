import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import postModel from "../models/postModel.js";

export const create = asyncHandler(async (req, res) => {
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

export const getPost = asyncHandler(async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;

    const limit = parseInt(req.query.limit) || 9;

    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const posts = await postModel
      .find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.category && { category: req.query.category }),
        ...(req.query.slug && { slug: req.query.slug }),
        ...(req.query.postId && { _id: req.query.postId }),
        ...(req.query.searchTerm && {
          $or: [
            { title: { $regex: req.query.searchTerm, $options: "i" } },
            { content: { $regex: req.query.searchTerm, $options: "i" } },
          ],
        }),
      })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await postModel.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await postModel.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          { posts, totalPosts, lastMonthPosts },
          "Get posts Successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      400,
      `Something went wrong while get the posts Server error ${error}`
    );
  }
});

export const deletePost = asyncHandler(async (req, res) => {
  try {
    const deletedPost = await postModel.findByIdAndDelete(req.params.postId);
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          { deletedPost },
          "This Post is delete Successfully"
        )
      );
  } catch (error) {
    throw new ApiError(403, "Something went wrong while deleting the post");
  }
});

export const updatePost = asyncHandler(async (req, res) => {
  try {
    const updatedPost = await postModel.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          { updatedPost },
          "This Post is update Successfully"
        )
      );
  } catch (error) {
    throw new ApiError(403, "Something went wrong while updating the post");
  }
});
