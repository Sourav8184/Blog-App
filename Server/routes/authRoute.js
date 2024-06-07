// Imports:
import express from "express";
const router = express.Router();

// Import Controllers:
import { signin } from "../controllers/authControllers.js";

// create Route:
router.route("/signin").post(signin);

// Export Route:
export default router;
