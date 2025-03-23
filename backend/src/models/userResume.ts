import mongoose from "mongoose";

const userResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  resume: String,
});

const UserResume = mongoose.model("UserResume", userResumeSchema);

export default UserResume;
