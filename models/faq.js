const mongoose = require("mongoose");

const faqSchema = mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    content: { type: String, trim: true, required: true },
    status: { type: String, required: true, enum: ["Draft", "Published"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Faq", faqSchema);
