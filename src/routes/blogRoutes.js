import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getUserBlog,
  singleBlog,
  updateBlog,
} from "../controllers/blogControllers.js";

const router = express.Router();

// routes
// create blog
router.post("/create-blog", createBlog);
// get all blogs
router.get("/get-blogs", getAllBlogs);
// update-blogs
router.put("/update-blog/:id", updateBlog);
// delete-blog
router.delete("/delete-blog/:id", deleteBlog);
// single-blog
router.get("/single-blog/:id", singleBlog);
// user-blog
router.get("/user-blog/:id", getUserBlog);
export default router;
