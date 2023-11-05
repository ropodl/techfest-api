const mongoose = require("mongoose");

const roleScheme = mongoose.Schema(
  {
    title: { type: String, trim: true, required: true, unique: true },
    level: { type: Number, trim: true, required: true },
    status: { type: String, required: true, enum: ["Draft", "Published"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleScheme);
