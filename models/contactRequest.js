const mongoose = require("mongoose");

const contactFormSchema = mongoose.Schema({
    name: { type: String, trim: true, required: true, },
    phone: { type: Number, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    subject: { type: String, trim: true, required: true },
    message: { type: String, trim: true, required: true },
}, { timestamps: true });

module.exports = mongoose.model("ContactForm", contactFormSchema);
