const mongoose = require("mongoose");

const sponsorLevelSchema = mongoose.Schema({
    title: { type: String, trim: true, required: true },
    perks: { type: String, trim: true, required: true },
    status: { type: String, required: true, enum: ["Draft", "Published"] },
}, { timestamps: true });

module.exports = mongoose.model("SponsorLevel", sponsorLevelSchema);
