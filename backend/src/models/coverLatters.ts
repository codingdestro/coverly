import mongoose from "mongoose";

const coverLetterSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  coverLetter: String,
});

const CoverLetter = mongoose.model("CoverLetter", coverLetterSchema);

export default CoverLetter;
