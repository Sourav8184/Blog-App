// Imports:
import express from "express";
const router = express.Router();

// Import Controllers:
import { signup, signin } from "../controllers/authControllers.js";

// create Route:
router.route("/signup").post(signup);
router.route("/signin").post(signin);

// Export Route:
export default router;
