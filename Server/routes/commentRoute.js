import express from "express";
const router = express.Router();
import {
  createComment,
  getComments,
  likeComment,
  editComment,
  deleteComment,
  getcomments,
} from "../controllers/commentControllers.js";
import { verifyJWT } from "../utils/userVerification.js";

router.route("/create").post(verifyJWT, createComment);
router.route("/getpostcomment/:postId").get(getComments);
router.route("/likecomment/:commentId").put(verifyJWT, likeComment);
router.route("/editcomment/:commentId").put(verifyJWT, editComment);
router.route("/deletecomment/:commentId").delete(verifyJWT, deleteComment);
router.route("/getcomments").get(verifyJWT, getcomments);
export default router;
