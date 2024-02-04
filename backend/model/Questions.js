import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  choose: [
    {
      id: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    },
  ],
  answer: {
    type: String,
    required: true,
  },
  examId: {
    type: String,
    required: true,
  },
});
export const Question = mongoose.model("Question", questionSchema);
