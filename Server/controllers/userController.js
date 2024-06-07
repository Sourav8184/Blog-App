// Helper Methods:
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

// Controllers:
const homePage = asyncHandler(async (req, res) => {
  res.json({ message: "Hello from Home" });
});

// export All controllers:
export { homePage };
