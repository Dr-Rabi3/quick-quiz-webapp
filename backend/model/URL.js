import mongoose from "mongoose";

const urlTokenSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

export const UrlToken = mongoose.model("UrlToken", urlTokenSchema);

