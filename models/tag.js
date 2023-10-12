const mongoose = require("mongoose")

const tagSchema = mongoose.Schema({
    title: { type: String, trim: true, required: true },
    slug: { type: String, trim: true, required: true },
    description: { type: String, trim: true }
}, { timestamps: true });

tagSchema.index({ name: "text" })

module.exports = mongoose.model("Tag", tagSchema)