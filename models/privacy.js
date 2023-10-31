const mongoose = require("mongoose");

const privacySchema = mongoose.Schema({
    content: { type: String, trim: true, },
    status: { type: String, enum: ["Draft", "Published"] },
}, { timestamps: true });

module.exports = mongoose.model("Privacy", privacySchema);
