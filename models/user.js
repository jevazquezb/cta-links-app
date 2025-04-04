import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true, //already done by Authjs but it's good practice to place it
  },
  image: {
    type: String,
  },
  plan: {
    type: String,
    enum: ["free", "pro"],
    default: "free",
  },
  hasAccess: {
    type: Boolean,
    default: false,
  },
  customerId: {
    type: String,
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
