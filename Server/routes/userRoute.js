// Imports:
import express from "express";
import cookieParser from "cookie-parser";
const router = express.Router();

const app = express();
app.use(cookieParser());

// Import Controllers:
import { signoutUser, getUser } from "../controllers/userController.js";

router.route("/signout").post(signoutUser);
router.route("/:userId").get(getUser);

// Export Route:
export default router;
