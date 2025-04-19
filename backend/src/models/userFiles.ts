import mongoose from "mongoose";

const userFileSchema = new mongoose.Schema({
  fileId: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const UserFiles = mongoose.model("UserFiles", userFileSchema);

export default UserFiles;
