// Imports
import "dotenv/config";
import express from "express";
import connect_DB from "./db/connect_DB.js";

const app = express();

// Middlewares:
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

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
