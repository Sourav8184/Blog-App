// Imports:
import express from "express";
import cookieParser from "cookie-parser";
const router = express.Router();

const app = express();
app.use(cookieParser());

// Import Controllers:
import { update } from "../controllers/userController.js";
import { verifyJWT } from "../utils/userVerification.js";

router.route("/update/:userId").put(verifyJWT, update);

// Export Route:

export default router;
