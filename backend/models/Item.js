const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const itemSchema = new mongoose.Schema({
  item_id: {
    type: String,
    default: uuidv4,
    unique: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  alert_type_id: {
    type: Number,
    ref: "AlertType",
    required: true
  },
  item_name: {
    type: String,
    required: true
  },
  expiry_date: {
    type: Date,
    required: true
  },
  additional_info: {
    type: mongoose.Schema.Types.Mixed
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("Item", itemSchema);
