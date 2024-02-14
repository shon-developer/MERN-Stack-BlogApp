import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      maxLength: [50, "Title should not exceed 50 chars"],
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: [120, "Description should not exceed 50 chars"],
    },
    image: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
