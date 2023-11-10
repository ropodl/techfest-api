const mongoose = require("mongoose");

const sponsorLevelSchema = mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    level: { type: Number, trim: true, required: true, unique: true },
    status: { type: String, required: true, enum: ["Draft", "Published"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SponsorLevel", sponsorLevelSchema);
