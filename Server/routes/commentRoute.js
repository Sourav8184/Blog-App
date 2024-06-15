import express from "express";
const router = express.Router();
import { createComment } from "../controllers/commentControllers.js";
import { verifyJWT } from "../utils/userVerification.js";

router.route("/create").post(verifyJWT, createComment);
export default router;
