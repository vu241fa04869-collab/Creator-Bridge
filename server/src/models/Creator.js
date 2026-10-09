import mongoose from "mongoose";

const creatorSchema = new mongoose.Schema({
  slug: { type: String, unique: true, index: true },
  name: { type: String, required: true },
  initials: String,
  location: String,
  specialty: { type: String, index: true },
  tools: [String],
  skills: [String],
  types: [String],
  projects: { type: Number, default: 0 },
  rate: { type: Number, default: 0 },
  verificationStatus: { type: String, enum: ["unverified", "identity-verified"], default: "unverified" },
  profileOrigin: { type: String, enum: ["sample", "creator-submitted"], default: "sample" },
  portfolio: [{ title: String, type: String, tool: String, imageUrl: String, workflow: String }],
  bio: String,
  workflow: String,
  palette: [String],
  back: String
}, { timestamps: true, minimize: false });

export default mongoose.models.Creator || mongoose.model("Creator", creatorSchema);
