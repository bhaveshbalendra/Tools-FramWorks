import express from "express";

import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user";
import mongoose from "mongoose";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/auth";

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("error mongodb"));
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: [process.env.FRONTEND_URL!],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/", userRouter);

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
