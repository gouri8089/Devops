const mongoose = require('mongoose');

const sentAlertSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  document_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true },
  alert_type: { type: String, enum: ['push', 'sms', 'email'], required: true },
  alert_date: { type: Date, required: true },
  sent_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SentAlert', sentAlertSchema);
