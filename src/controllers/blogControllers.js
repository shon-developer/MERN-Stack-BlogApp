import Blog from "../models/blogSchema.js";
import User from "../models/userSchema.js";
import mongoose from "mongoose";

// create blog
export const createBlog = async (req, res) => {
  try {
    const { title, description, image, userId } = req.body;
    if (!title || !description || !image || !userId) {
      return res.status(400).json({
        success: false,
        message: "All the fields are required",
      });
    }
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const blog = new Blog({ title, description, image, userId });
    // create session
    const session = await mongoose.startSession();
    // perform transaction
    session.startTransaction();
    // save blog on session basis
    await blog.save({ session });
    // push the blog into existing user
    existingUser.blogs.push(blog);
    // save existing user on session basis
    await existingUser.save({ session });
    // complete the session
    await session.commitTransaction();
    await blog.save();
    res.status(201).json({
      success: true,
      message: "Blog has been created successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in create blog functionality",
      error,
    });
  }
};
// get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    if (!blogs) {
      return res.status(404).json({
        success: false,
        message: "Blogs not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "All Blogs",
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in get all blogs functionalities",
      error,
    });
  }
};
// update blog
export const updateBlog = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Blog has ben updated successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in updating blog functionality",
      error,
    });
  }
};
// delete blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id).populate("userId");
    await blog.userId.blogs.pull(blog);
    await blog.userId.save();
    res.status(200).json({
      success: true,
      message: "Blog has been deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in deleting blog functionality",
      error,
    });
  }
};
// get single blog
export const singleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Single Blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in getting single blog functionality",
      error,
    });
  }
};

// get userblog
export const getUserBlog = async (req, res) => {
  try {
    const userBlog = await User.findById(req.params.id).populate("blogs");
    if (!userBlog) {
      return res.status(404).json({
        success: false,
        message: "No blogs found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User blogs",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error is getting user blog functionality",
      error,
    });
  }
};
