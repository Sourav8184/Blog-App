// Imports:
import express from "express";
const router = express.Router();

// Import Controllers:
import { homePage } from "../controllers/userController.js";

router.route("/home").get(homePage);

// Export Route:
export default router;
