import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Project title required"],
  },
  description: {
    type: String,
    required: [true, "Project description required"],
  },
  techStack: {
    type: [String],
    required: true,
  },
  image: {
  type: String,
  default: "",
},
  githubLink: {
    type: String,
  },
  liveLink: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("Project", projectSchema);
