const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const alertSettingSchema = new mongoose.Schema({
  setting_id: {
    type: String,
    default: uuidv4, // generate UUID by default
    unique: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  document_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
    required: true
  },
  lead_time_value: {
    type: Number,
    required: true
  },
  lead_time_unit: {
    type: String,
    enum: ["days", "weeks", "months", "years"],
    required: true
  },
  preferred_method: {
    type: String,
    enum: ["email", "sms", "push"],
    required: true
  }
});
module.exports = mongoose.model("AlertSetting", alertSettingSchema);
