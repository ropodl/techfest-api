const mongoose = require("mongoose");

const termsSchema = mongoose.Schema({
    content: { type: String, trim: true, },
    status: { type: String, enum: ["Draft", "Published"] },
}, { timestamps: true });

module.exports = mongoose.model("Terms", termsSchema);
