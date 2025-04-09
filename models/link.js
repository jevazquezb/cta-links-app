import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // ctaId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "CTA",
    //   required: true,
    // },
    videoUrl: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    cta: {
      message: {
        type: String,
      },
      buttonLabel: {
        type: String,
      },
      buttonUrl: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Link || mongoose.model("Link", linkSchema);
