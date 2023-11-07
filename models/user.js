const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    userImage: { type: Object, url: String, name: String },
    workshops: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Workshop", unique: true },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
