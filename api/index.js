import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routes/user.route.js'
import authRouter from "./routes/auth.route.js";
dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO)
  .then((e) => {
    console.log("connected toDb");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, (req, res) => {
  console.log(`connected successfully at port ${3000}!!! `);
});


app.use(express.json())

app.use("/api/user",userRouter)

app.use("/api/auth",authRouter)
