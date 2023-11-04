const mongoose = require("mongoose");

const prizeSchema = mongoose.Schema({
    title: { type: String, trim: true, required: true, },
    prizeImage: { type: Object, url: String, name: String },
    description: { type: String, trim: true, required: true },
    status: { type: String, required: true, enum: ["Draft", "Published"] },
}, { timestamps: true });

module.exports = mongoose.model("Prize", prizeSchema);
