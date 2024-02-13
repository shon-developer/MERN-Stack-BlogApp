import express from "express";
import {
  getAllUsers,
  logOut,
  login,
  signUp,
} from "../controllers/authControllers.js";

const router = express.Router();

// routes
// getAllUser
router.get("/get-allusers", getAllUsers);
// signUp
router.post("/signup", signUp);
// login
router.post("/login", login);
// logout
router.post("/logout", logOut);

export default router;
