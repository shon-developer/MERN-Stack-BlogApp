import express from "express";
import Route from "./routes/authRoutes.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan(dev));
app.use(cookieParser());

// routes
app.use("/api/v1/auth", authRoute);

app.use("/", (req, res) => {
  res.send("<h1>Blog App</h1>");
});

export default app;
