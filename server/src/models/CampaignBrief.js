import mongoose from "mongoose";

const campaignBriefSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 120 },
  brand: { type: String, required: true, trim: true, maxlength: 100 },
  contentType: { type: String, required: true, maxlength: 60 },
  style: { type: String, maxlength: 200, default: "" },
  aspectRatio: { type: String, maxlength: 40, default: "Flexible" },
  idea: { type: String, required: true, trim: true, maxlength: 4000 },
  budget: { type: Number, min: 0, default: null },
  deadline: { type: String, default: "" },
  commercialUse: { type: Boolean, default: false },
  creator: { type: String, default: "" },
  status: { type: String, default: "Draft" }
}, { timestamps: true, minimize: false });

export default mongoose.models.CampaignBrief || mongoose.model("CampaignBrief", campaignBriefSchema);
