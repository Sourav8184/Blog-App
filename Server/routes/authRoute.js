// Imports:
import express from "express";
const router = express.Router();

// Import Controllers:
import {
  signup,
  signin,
  googleSignIn,
} from "../controllers/authControllers.js";

// create Route:
router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/google").post(googleSignIn);

// Export Route:
export default router;
