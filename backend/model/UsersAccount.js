import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  "first-name": {
    type: String,
    required: true,
  },
  "last-name": {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    message: "This email is already used",
  },
  id: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirm: {
    type: Boolean,
    required: true,
  },
});
UsersSchema.post("save", function (error, doc, next) {
  if (error.code === 11000) {
    next(new Error("This email is already used"));
  } else {
    next(error);
  }
});
export const User = mongoose.model("User", UsersSchema);
