const mongoose = require("mongoose")

const portfolioSchema = mongoose.Schema({
    title: { type: String, trim: true, required: true },
    slug: { type: String, trim: true, required: true, unique: true },
    featuredImage: { type: Object, url: String, name: String },
    visibility: { type: String, required: true, enum: ["Public", "Private"] }
}, { timestamps: true });

module.exports = mongoose.model("Portfolio", portfolioSchema);