const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const logSchema = new mongoose.Schema({
  log_id: {
    type: Number,
    unique: true,
    required: true
  },
  alert_id: {
    type: String,
    ref: "Alert",
    required: true
  },
  sent_at: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["Sent", "Failed", "Pending"],
    required: true
  },
  response_data: {
    type: String
  }
});
module.exports = mongoose.model("AlertLog", logSchema);
