import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Blog title required"],
  },
  content: {
    type: String,
    required: [true, "Blog content required"],
  },
  author: {
    type: String,
    required: [true, "Author name required"],
  },
  image: {
    type: String,
  },
  tags: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("Blog", blogSchema);
