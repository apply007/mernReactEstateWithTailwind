import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.Mongo)
  .then((e) => {
    console.log("connected toDb");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, (req, res) => {
  console.log(`connected successfully at port ${3000}!!! `);
});
