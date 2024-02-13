import User from "../models/userSchema.js";

// getAllUsers || method: get || /api/v1/auth/getAllUsers
export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found",
      });
      res.status(200).json({
        success: true,
        message: "All users",
        user,
      });
    }
  } catch (error) {
    res.send(500).json({
      success: false,
      message: "Error in getting all users",
      error,
    });
  }
};

// signUp || method: post || /api/v1/auth/signUp
export const signUp = async (req, res) => {};

// login || method: post || /api/v1/auth/login
export const login = async (req, res) => {};

// logout || method: post || /api/v1/auth/login
export const logOut = async (req, res) => {};
