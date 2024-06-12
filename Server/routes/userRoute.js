// Imports:
import express from "express";
import cookieParser from "cookie-parser";
const router = express.Router();

const app = express();
app.use(cookieParser());

// Import Controllers:
import {
  updateUser,
  deleteUser,
  signoutUser,
} from "../controllers/userController.js";
import { verifyJWT } from "../utils/userVerification.js";

router.route("/update/:userId").put(verifyJWT, updateUser);
router.route("/delete/:userId").delete(verifyJWT, deleteUser);
router.route("/signout").post(signoutUser);
// Export Route:

export default router;
