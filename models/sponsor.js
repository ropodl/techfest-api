const mongoose = require("mongoose");

const sponsorSchema = mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    sponsorImage: { type: Object, url: String, name: String },
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SponsorLevel",
      required: true,
    },
    link: { type: String, trim: true },
    description: { type: String, trim: true },
    status: { type: String, required: true, enum: ["Draft", "Published"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sponsor", sponsorSchema);
