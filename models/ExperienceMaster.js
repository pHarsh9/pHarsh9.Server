import mongoose from "mongoose";

const ExperienceMasterSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    period: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    bulletPoints: {
      type: [String],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("ExperienceMaster", ExperienceMasterSchema);
