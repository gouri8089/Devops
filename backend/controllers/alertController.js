const Alert = require('../models/Alert');
const Document = require('../models/Document');
const mongoose = require('mongoose');

exports.createAlert = async (req, res) => {
  
    const { userId, documentType, alertType, expiryDate, notes, alertMethod } = req.body;
    //const userId = req.user.user_id;
    
    console.log('Creating alert for user:', userId);
try {
    if (!documentType || !alertType || !expiryDate || !alertMethod) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    // Create a new document item
    const newDoc = await Document.create({
      item_name: documentType,
      user_id: userId,
      alert_type_id: alertType,
      expiry_date: new Date(expiryDate),
      additional_info: notes || '',
      created_at: new Date()
    });

    // Create an alert for that document
    const newAlert = await Alert.create({
      item_id: newDoc._id,
      user_id: userId,
      alert_date: new Date(expiryDate), // in future, this may depend on user lead time
      alert_method: alertMethod,
      message: `Reminder: Your ${documentType} is expiring on ${expiryDate}.`,
      is_sent: false,
      created_at: new Date()
    });

    res.status(201).json({ message: 'Alert created successfully.', alert: newAlert });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error creating alert.' });
  }
};

exports.getMyAlerts = async (req, res) => {
  try {
    const user_id = req.user.userId;

    // Find alerts for the user and populate the related document's item_name
    const alerts = await Alert.find({ user_id })
      .populate({ path: 'item_id', select: 'item_name' })
      .sort({ alert_date: 1 });

    // Map to only include the required fields
    const formattedAlerts = alerts.map(alert => ({
      _id: alert._id,
      alert_id: alert.alert_id || alert._id,
      item_name: alert.item_id?.item_name || "N/A",
      alert_date: alert.alert_date,
      alert_method: alert.alert_method,
      is_sent: alert.is_sent
    }));

    res.json({ alerts: formattedAlerts });
  } catch (err) {
    console.error('Error fetching alerts:', err);
    res.status(500).json({ error: 'Failed to retrieve alerts' });
  }
};

// @desc    Delete a specific alert (if owned by user)
// @route   DELETE /api/alerts/:id
// @access  Private
exports.deleteAlert = async (req, res) => {
  // console.log(req.user)
  // console.log('Deleting alert with ID:', req.params.id);
  // console.log('User ID:', req.params.id);
  // console.log('Logged-in user ID:', req.user.userId);
  const alert = await Alert.findById(req.params.id);
  // console.log('Found alert:', alert);
  try {
    

    if (!alert) {
      return res.status(404).json({ error: 'Alert not found' });
    }

    // Ensure alert belongs to logged-in user
    if (alert.user_id.toString() !== req.user.userId.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this alert' });
    }

    await alert.deleteOne();
    res.json({ message: 'Alert deleted successfully' });
  } catch (err) {
    console.error('Error deleting alert:', err);
    res.status(500).json({ error: 'Failed to delete alert' });
  }
};