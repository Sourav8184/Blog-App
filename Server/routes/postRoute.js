import express from "express";
import { verifyJWT } from "../utils/userVerification.js";
import {
  create,
  getPost,
  deletePost,
  updatePost,
} from "../controllers/postControllers.js";

const router = express.Router();

router.route("/create").post(verifyJWT, create);
router.route("/getposts").get(verifyJWT, getPost);
router.route("/deletepost/:postId/:userId").delete(verifyJWT, deletePost);
router.route("/updatepost/:postId/:userId").put(verifyJWT, updatePost);

export default router;
