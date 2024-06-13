import express from "express";
import { verifyJWT } from "../utils/userVerification.js";
import { create, getPost } from "../controllers/postControllers.js";

const router = express.Router();

router.route("/create").post(verifyJWT, create);
router.route("/getposts").get(getPost);
export default router;
