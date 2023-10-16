const mongoose = require("mongoose");

const termsSchema = mongoose.Schema({
    content: { type: String, trim: true, required: true },
    status: { type: String, required: true, enum: ["Draft", "Published"] },
}, { timestamps: true });

module.exports = mongoose.model("Terms", termsSchema);
