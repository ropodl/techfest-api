const mongoose = require("mongoose");
const { slugify } = require("../utils/slugify");

const blogSchema = mongoose.Schema({
    title: { type: String, trim: true, required: true, },
    slug: { type: String, trim: true, required: true, unique: true },
    excerpt: { type: String, trim: true },
    content: { type: String, trim: true, required: true },
    featuredImage: { type: Object, url: String, name: String },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    status: { type: String, required: true, enum: ["Draft", "Published"] },
    visibility: { type: String, required: true, enum: ["Public", "Private"] }
}, { timestamps: true });

blogSchema.index({ name: "text" });

module.exports = mongoose.model("Blog", blogSchema);
