import mongoose from "mongoose";

const CTASchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    linkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Link",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    buttonLabel: {
      type: String,
      required: true,
    },
    buttonUrl: {
      type: String,
      required: true,
    },
    style: {
      type: String,
      default: "btn btn-primary",
    }, // Default Tailwind button style
  },
  { timestamps: true }
);

export default mongoose.models.CTA || mongoose.model("CTA", CTASchema);
