import mongoose from "mongoose";

const ExamsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    unique: true,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  notify:{
    type: Number,
    required: true,
    default:0,
  }
});
export const Exam = mongoose.model("Exam", ExamsSchema);
