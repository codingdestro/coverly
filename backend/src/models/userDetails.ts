import mongoose from "mongoose";

const userDetailsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  email: String,
  phone: String,
  address: String,
  links: {
    type: [
      {
        url: String,
        name: String,
      },
    ],
    default: [], // array of objects
  },
  city: String,
  state: String,
  zip: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const UserDetails = mongoose.model("UserDetails", userDetailsSchema);

export default UserDetails;
