import mongoose from "mongoose";

const ProfileMasterSchema = new mongoose.Schema(
  {
    monogram: {
      type: String,
      required: true,
      default: "pHarsh9",
    },
    fullName: {
      type: String,
      required: true,
      default: "Harsh Sharma",
    },
    heroSlogan: {
      type: String,
      required: true,
      default: "FULL STACK WEB DEVELOPER & MOBILE APPLICATION ENGINEER CONSTRUCTING SCALABLE DIGITAL ARCHITECTURES.",
    },
    bioTitle: {
      type: String,
      required: true,
      default: "HARSH SHARMA (PHARSH9)",
    },
    bioDescription: {
      type: String,
      required: true,
      default: "A full stack web developer and mobile application engineer with a passion for designing scalable, high-concurrency software and high-fidelity native layouts.",
    },
    field: {
      type: String,
      required: true,
      default: "FULL STACK, MOBILE",
    },
    focus: {
      type: String,
      required: true,
      default: "SYSTEM ARCHITECTURE",
    },
    location: {
      type: String,
      required: true,
      default: "INDIA [GMT +5:30]",
    },
    availability: {
      type: String,
      required: true,
      default: "OPEN FOR CONTRACTS",
    },
    socialLinks: [
      {
        platform: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    copyrightText: {
      type: String,
      required: true,
      default: "© 2026 PHARSH9 SYSTEMS. ALL RIGHTS RESERVED.",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ProfileMaster", ProfileMasterSchema);
