import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name required"],
  },
  email: {
    type: String,
    required: [true, "Email required"],
  },
  message: {
    type: String,
    required: [true, "Message required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("Contact", contactSchema);
