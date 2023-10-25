const mongoose = require("mongoose")

const teamSchema = mongoose.Schema({
    memberImage: { type: Object, url: String, name: String },
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true },
    phone: { type: Number, trim: true },
    role: { type: String, trim: true, required: true },
    leader: { type: Boolean, default: false, required: true },
    description: { type: String, trim: true, required: true },
    status: { type: String, required: true, enum: ["Draft", "Published"] }
}, { timestamps: true });

module.exports = mongoose.model("Team", teamSchema);