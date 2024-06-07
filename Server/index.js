// Imports
import express from "express";
import connect_DB from "./db/connect_DB.js";

const app = express();

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
