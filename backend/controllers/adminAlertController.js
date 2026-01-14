const SentAlert = require('../models/SentAlert');
const User = require('../models/User');
const Document = require('../models/Document');

exports.getAllAlerts = async (req, res) => {
  try {
    const { user, type, status, date } = req.query;

    const filters = {};

    if (status) filters.status = status;
    if (date) filters.alert_date = { $eq: new Date(date) };

    const alerts = await SentAlert.find(filters)
      .populate('user_id', 'email')
      .populate('document_id', 'item_name')
      .sort({ sent_at: -1 });

    const results = alerts.filter(a => {
      const byUser = user ? a.user_id?.email?.toLowerCase().includes(user.toLowerCase()) : true;
      const byType = type ? a.document_id?.item_name?.toLowerCase().includes(type.toLowerCase()) : true;
      return byUser && byType;
    });

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
};

exports.bulkDeleteAlerts = async (req, res) => {
  try {
    const { alertIds } = req.body;
    if (!Array.isArray(alertIds)) return res.status(400).json({ error: 'alertIds must be an array' });

    const result = await SentAlert.deleteMany({ _id: { $in: alertIds } });
    res.json({ message: `Deleted ${result.deletedCount} alerts.` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete alerts' });
  }
};

exports.bulkResendAlerts = async (req, res) => {
  // Stub implementation: you can integrate email or push resend logic here
  try {
    const { alertIds } = req.body;
    if (!Array.isArray(alertIds)) return res.status(400).json({ error: 'alertIds must be an array' });

    // Placeholder: just log the IDs
    console.log('Resend requested for alert IDs:', alertIds);
    res.json({ message: `Resend triggered for ${alertIds.length} alerts.` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to resend alerts' });
  }
};
// This controller handles fetching, bulk deleting, and resending admin alerts.
// It includes methods to filter alerts by user, type, status, and date.