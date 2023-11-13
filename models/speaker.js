const mongoose = require("mongoose");

const speakerSchema = mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    position: { type: String, trim: true, required: true },
    description: { type: String, trim: true },
    speakerImage: { type: Object, url: String, name: String },
    facebook: { type: String, trim: true },
    twitter: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    status: { type: String, required: true, enum: ["Draft", "Published"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Speaker", speakerSchema);
