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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Card", CardSchema);
