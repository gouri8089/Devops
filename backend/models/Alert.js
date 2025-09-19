const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const alertSchema = new mongoose.Schema({
  alert_id: {
    type: String,
    default: uuidv4,
    unique: true
  },
  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  alert_date: {
    type: Date,
    required: true
  },
  alert_method: {
    type: String,
    enum: ["email", "sms", "push"],
    required: true
  },
  message: {
    type: String
  },
  is_sent: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("Alert", alertSchema);
