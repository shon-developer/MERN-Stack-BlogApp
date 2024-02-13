import Blog from "../models/blogSchema.js";

// create blog
export const createBlog = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    if (!title || !description || !image) {
      return res.status(400).json({
        success: false,
        message: "All the fields are required",
      });
    }
    const blog = await Blog.create({ title, description, image });
    res.status(201).json({
      success: false,
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
    const blog = await Blog.findByIdAndDelete(id);
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
