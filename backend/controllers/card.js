const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  priority: {
    type: String,
    enum: ["blue", "pink", "green", "gray"],
    default: "gray",
  },
  deadline: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Card", CardSchema);
