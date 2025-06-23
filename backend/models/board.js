const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon: { type: String, required: true },           // e.g., "bolt", "star"
  background: { type: String, required: true },      // e.g., "bg-3"
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
}, { timestamps: true });

module.exports = mongoose.model('Board', boardSchema);
