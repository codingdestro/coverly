import mongoose from "mongoose";

//Eduction schema
const educationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  school: String,
  degree: String,
  fieldOfStudy: String,
  startDate: Date,
  endDate: Date,
  description: String,
  createdAt: { type: Date, default: Date.now },
});

//Experience schema
const experienceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  company: String,
  title: String,
  location: String,
  startDate: Date,
  endDate: Date,
  description: String,
  createdAt: { type: Date, default: Date.now },
});

const socialSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  social: String,
  url: String,
});

const userDetailsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const UserDetails = mongoose.model("UserDetails", userDetailsSchema);
const Education = mongoose.model("Education", educationSchema);
const Experience = mongoose.model("Experience", experienceSchema);
const Social = mongoose.model("Social", socialSchema);
export { UserDetails, Education, Experience, Social };
