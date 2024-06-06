import express from "express";
const app = express();
const port = 1000;

app.listen(port, () => {
  console.log("Server is Started at PORT: ", port);
});
