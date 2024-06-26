// Imports
import "dotenv/config";
import express from "express";
import connect_DB from "./db/connect_DB.js";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares:
app.use(cookieParser());
app.use(express.json());

// DataBase Connection:
connect_DB()
  .then(() => {
    // some time database are connected but express app are not working
    app.on("error", (err) => {
      console.log(`Server is Not Start !!`);
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });

// Import Routes:
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";
import postRouter from "./routes/postRoute.js";
import commentRouter from "./routes/commentRoute.js";

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
