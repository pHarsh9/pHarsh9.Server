import mongoose from "mongoose";

const ProjectMasterSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    projectNumber: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: "",
    },
    specs: [
      {
        label: { type: String },
        value: { type: String },
      },
    ],
    summary: {
      type: String,
      default: "",
    },
    figTitle: {
      type: String,
      default: "FIG 01. SYSTEMS TOPOLOGY",
    },
    figCaption: {
      type: String,
      default: "",
    },
    diagramImage: {
      type: String,
      default: "",
    },
    abstractHeader: {
      type: String,
      default: "",
    },
    abstractBody: {
      type: String,
      default: "",
    },
    codeBlock: {
      code: { type: String, default: "" },
      language: { type: String, default: "" },
      filename: { type: String, default: "" },
    },
    metrics: [
      {
        label: { type: String },
        value: { type: String },
        desc: { type: String },
        isHighlight: { type: Boolean, default: false },
      },
    ],
    bottomImage: {
      type: String,
      default: "",
    },
    bottomText: {
      type: String,
      default: "",
    },
    liveLink: {
      type: String,
      default: "",
    },
    playstoreLink: {
      type: String,
      default: "",
    },
    appstoreLink: {
      type: String,
      default: "",
    },
    gitLink: {
      type: String,
      default: "",
    },
    apkLink: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("ProjectMaster", ProjectMasterSchema);
