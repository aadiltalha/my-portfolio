import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name required"],
  },
  message: {
    type: String,
    required: [true, "Message required"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "Rating 1–5 required"],
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("Testimonial", testimonialSchema);
