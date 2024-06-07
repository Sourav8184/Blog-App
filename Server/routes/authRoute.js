// Imports:
import express from "express";
const router = express.Router();

// Import Controllers:
import { signup } from "../controllers/authControllers.js";

// create Route:
router.route("/signup").post(signup);

// Export Route:
export default router;
