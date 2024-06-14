import express from "express";
import { verifyJWT } from "../utils/userVerification.js";
import { create, getPost, deletePost } from "../controllers/postControllers.js";

const router = express.Router();

router.route("/create").post(verifyJWT, create);
router.route("/getposts").get(getPost);
router.route("/deletepost/:postId/:userId").delete(verifyJWT, deletePost);

export default router;
