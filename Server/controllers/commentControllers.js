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

export const getComments = asyncHandler(async (req, res) => {
  try {
    const allComments = await commentModel
      .find({ postId: req.params.postId })
      .sort({ createdAt: -1 });
    return res
      .status(201)
      .json(
        new ApiResponse(200, { allComments }, "Get All Comment Successfully")
      );
  } catch (error) {
    throw new ApiError(403, "Something went wrong while get the comment");
  }
});

export const likeComment = asyncHandler(async (req, res) => {
  try {
    const comment = await commentModel.findById(req.params.commentId);
    if (!comment) {
      throw new ApiError(404, "comment not found");
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    return res
      .status(201)
      .json(
        new ApiResponse(200, { comment }, "Like the  Comment Successfully")
      );
  } catch (error) {
    throw new ApiError(403, "Something went wrong while Like the comment");
  }
});

export const editComment = asyncHandler(async (req, res) => {
  try {
    const comment = await commentModel.findById(req.params.commentId);
    if (!comment) {
      throw new ApiError(404, "comment not found");
    }

    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      throw new ApiError(404, "You are not allow to edit this post");
    }

    const editComment = await commentModel.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    return res
      .status(201)
      .json(
        new ApiResponse(200, { editComment }, "Like the  Comment Successfully")
      );
  } catch (error) {
    throw new ApiError(403, "Something went wrong while Like the comment");
  }
});

export const deleteComment = asyncHandler(async (req, res) => {
  try {
    const comment = await commentModel.findById(req.params.commentId);
    if (!comment) {
      throw new ApiError(404, "comment not found");
    }
    if (req.user.id != comment.userId && !req.user.isAdmin) {
      throw new ApiError(404, "You are not allow to delete this comment");
    }
    const deletedComment = await commentModel.findByIdAndDelete(
      req.params.commentId
    );
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          { deletedComment },
          "Delete this  Comment Successfully"
        )
      );
  } catch (error) {
    throw new ApiError(403, "Something went wrong while deleting the comment");
  }
});
