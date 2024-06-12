import express from "express";
import { verifyJWT } from "../utils/userVerification.js";
import { create } from "../controllers/postControllers.js";

const router = express.Router();

router.route("/create").post(verifyJWT, create);
export default router;
