import User from "../models/userSchema.js";
import JWT from "jsonwebtoken";
import config from "../config/index.js";

const cookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

// signUp || method: post || /api/v1/auth/signUp
export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(404).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    // check if the user is already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(200).json({
        success: false,
        message: "User already exists, please login",
      });
    }
    // create new user
    const user = await User.create({
      name,
      email,
      password,
    });
    // token
    const token = JWT.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRY,
    });
    // safety
    user.password = undefined;
    // store this token into cookie
    res.cookie("token", token, cookieOptions);
    // send response
    res.status(200).json({
      success: true,
      message: "User signed up successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in signing up",
      error,
    });
  }
};

// login || method: post || /api/v1/auth/login
export const login = async (req, res) => {};

// logout || method: post || /api/v1/auth/login
export const logOut = async (req, res) => {};
