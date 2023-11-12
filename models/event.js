const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    link: { type: String, trim: true, required: true },
    eventImage: { type: Object, url: String, name: String },
    status: { type: String, required: true, enum: ["Draft", "Published"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
