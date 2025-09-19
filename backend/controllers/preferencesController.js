const Alert = require('../models/Alert'); // Add this at the top if not already
const AlertSetting = require('../models/AlertSetting'); // Import the AlertSetting model

exports.savePreferences = async (req, res) => {
  const { documentId, leadType, leadValue, alertType } = req.body;
    
  if (!documentId || !leadType || !leadValue || !alertType) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    // Check if a preference already exists for this user and document
    const existingPref = await AlertSetting.findOne({ user_id: req.user.userId, document_id: documentId });

    if (existingPref) {
      // Update the existing preference
      existingPref.lead_time_unit = leadType;
      existingPref.lead_time_value = leadValue;
      existingPref.preferred_method = alertType;
      await existingPref.save();
      // Update alert_method in Alert table for this user and document
      await Alert.updateMany(
        { user_id: req.user.userId, item_id: documentId },
        { $set: { alert_method: alertType } }
      );
      res.status(200).json({ message: 'Preferences updated successfully' });
    } else {
      // Create a new preference
      const newPref = new AlertSetting({
        user_id: req.user.userId,
        document_id: documentId,
        lead_time_unit: leadType,
        lead_time_value: leadValue,
        preferred_method: alertType,
      });
      await newPref.save();
      // Update alert_method in Alert table for this user and document
      await Alert.updateMany(
        { user_id: req.user.userId, item_id: documentId },
        { $set: { alert_method: alertType } }
      );
      res.status(201).json({ message: 'Preferences saved successfully' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error saving preferences' });
  }
};