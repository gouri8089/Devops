const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types; 

const alertHistorySchema = new mongoose.Schema({
  
  user_id: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  document_id: {
    type: ObjectId,
    ref: "Document",
    required: true
  },
    alert_type: {
    type: String,
    enum: ["email", "sms", "push"],
    },
    alert_date: {
    type: Date,
    default: Date.now
    },
    sent_at: {
type: Date,
default: Date.now
    },
  
});

module.exports = mongoose.model("AlertHistory", alertHistorySchema);