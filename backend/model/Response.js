import mongoose from "mongoose";
// Define the schema
const examSubmissionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  examId: {
    type: String,
    required: true,
  },
  student: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      // unique: true,
      required: true,
    },
  },
  answers: [
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
});

// Create a model using the schema
export const ExamSubmission = mongoose.model("ExamSubmission", examSubmissionSchema);

