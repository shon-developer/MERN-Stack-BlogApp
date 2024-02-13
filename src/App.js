import express from "express";
import authRoute from "./routes/authRoutes.js";
import blogRoute from "./routes/blogRoutes.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import crypto from "crypto";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/blog", blogRoute);

// crypto
/*
const key = crypto.pseudoRandomBytes(64).toString("hex");
console.log(key);
*/

app.use("/", (req, res) => {
  res.send("<h1>Blog App</h1>");
});

export default app;
