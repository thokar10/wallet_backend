import "express-async-errors";

import express from "express";
import mongoose from "mongoose";
import "./models";
import "./models/user.model";
import userRouter from "./modules/Users/routes";
import cors from "cors";
import ErrorHandler from "./modules/Users/handler/ErrorHandler";
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.mongoDb_connect!, {})
  .then(() => {
    console.log("connect to database succesfully");
  })
  .catch((e) => {
    console.log("could not connect to database");
  });

app.use("/users", userRouter);
app.use(ErrorHandler);

app.listen(8000, () => {
  console.log("server started successfully");
});
