const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  alert_type_id: { type: mongoose.Schema.Types.ObjectId, ref: "AlertType", required: true },
  item_name: { type: String, required: true },
  expiry_date: { type: Date, required: true },
  notes: { type: String },
  file_path: { type: String }, // Save file path
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Document", documentSchema);
