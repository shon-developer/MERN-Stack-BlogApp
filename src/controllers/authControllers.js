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
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    // find the user
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found, please signup",
      });
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }
    const token = JWT.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRY,
    });
    user.password = undefined;
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Error in login functionality",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in login functionality",
      error,
    });
  }
};

// logout || method: post || /api/v1/auth/login
export const logOut = async (req, res) => {};

// getAllUsers || method: get || /api/v1/auth/getAllUsers
export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found",
      });
    }
    res.status(200).json({
      success: true,
      message: "All users",
      user,
    });
  } catch (error) {
    res.send(500).json({
      success: false,
      message: "Error in getting all users",
      error,
    });
  }
};
