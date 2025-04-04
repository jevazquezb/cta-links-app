import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ctaId: {
    type: Schema.Types.ObjectId,
    ref: "CTA",
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.models.Link || mongoose.model("Link", linkSchema);
