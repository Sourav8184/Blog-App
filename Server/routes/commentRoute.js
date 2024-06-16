import express from "express";
const router = express.Router();
import {
  createComment,
  getComments,
  likeComment,
} from "../controllers/commentControllers.js";
import { verifyJWT } from "../utils/userVerification.js";

router.route("/create").post(verifyJWT, createComment);
router.route("/getpostcomment/:postId").get(getComments);
router.route("/likecomment/:commentId").put(verifyJWT, likeComment);

export default router;
