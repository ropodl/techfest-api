const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    image: { type: String, trim: true, required: true },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);