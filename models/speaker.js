const mongoose = require("mongoose")

const speakerSchema = mongoose.Schema({
  name: { type:String,trim:true,required:true },
  position: { type:String,trim:true,required:true },
  description: { type:String,trim:true,required:true },
  speakerImage: { type: Object, url: String, name: String },
}, { timestamps:true });

module.exports = mongoose.model("Speaker",speakerSchema);
