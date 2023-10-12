const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    title: { type: String, trim: true, required: true },
    slug: { type: String, trim: true, required: true },
    description: { type: String, trim: true }
}, { timestamps: true });

categorySchema.index({ name: "text" })

module.exports = mongoose.model("Category", categorySchema)