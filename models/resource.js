const mongoose = require("mongoose");

const resourceSchema = mongoose.Schema({
    title: { type: String, trim: true, required: true, },
    file: { type: Object, url: String, name: String },
    status: { type: String, required: true, enum: ["Draft", "Published"] },
}, { timestamps: true });

module.exports = mongoose.model("Resource", resourceSchema);
