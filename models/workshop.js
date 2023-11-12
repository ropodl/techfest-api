const mongoose = require("mongoose");

const workshopSchema = mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    workshopImage: { type: Object, url: String, name: String },
    link: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    status: { type: String, required: true, enum: ["Draft", "Published"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workshop", workshopSchema);
