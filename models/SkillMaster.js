import mongoose from "mongoose";

const SkillMasterSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true, // LANGUAGES, FRAMEWORKS, INFRASTRUCTURE
    },
    skills: {
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

export default mongoose.model("SkillMaster", SkillMasterSchema);
