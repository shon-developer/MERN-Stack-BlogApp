import mongoose from "mongoose";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config/index.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxLength: [50, "Name should not exceed 50 chars"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password should contain at least 8 chars"],
      select: false,
    },
  },
  { timestamps: true }
);

// encrypt the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
// userSchema methods
userSchema.methods = {
  // compare password
  comparePassword: async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  },
  // generate JWT token
  getJWTtoken: function () {
    return JWT.sign({ _id: this._id }, config.JWT_SECRET, {
      expiresIn: config,
    });
  },
};

export default mongoose.model("User", userSchema);
