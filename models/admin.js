const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = mongoose.Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true, unique: true },
  password: { type: String, required: true },
  //   isVerified: { type: Boolean, required: true, default: false },
  role: {
    type: String,
    default: "admin",
  },
});

adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

adminSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

module.exports = mongoose.model("Admin", adminSchema);