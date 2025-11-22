import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  pageViews: {
    type: Number,
    default: 0,
  }
});

export default mongoose.model("Analytics", analyticsSchema);
