const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    slug: { type: String, trim: true, required: true, unique: true },
    excerpt: { type: String, trim: true },
    content: { type: String, trim: true, required: true },
    featuredImage: { type: Object, url: String, name: String },
    status: { type: String, required: true, enum: ["Draft", "Published"] },
  },
  { timestamps: true }
);

blogSchema.index({ name: "text" });

module.exports = mongoose.model("Blog", blogSchema);
