import express from "express";

const app = express();

// middlewares
app.use(express.json());

app.use("/", (req, res) => {
  res.send("<h1>Blog App</h1>");
});

export default app;
