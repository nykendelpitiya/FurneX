const mongoose = require("mongoose");

const furnitureSchema = new mongoose.Schema({
  type: String,
  x: Number,
  y: Number,
  rotation: Number,
  color: String
});

const designSchema = new mongoose.Schema({
  designName: {
    type: String,
    required: true
  },

  room: {
    width: Number,
    height: Number,
    shape: String,
    wallColor: String,
    floorColor: String
  },

  furniture: [furnitureSchema],

  previewImage: String

}, { timestamps: true });

module.exports = mongoose.model("Design", designSchema);