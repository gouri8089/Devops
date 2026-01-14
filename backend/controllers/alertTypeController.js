const AlertType = require('../models/AlertType');

exports.getAllAlertTypes = async (req, res) => {
  try {
    const alertTypes = await AlertType.find();
    res.status(200).json(alertTypes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch alert types' });
  }
};

// controllers/alertTypeController.js

exports.getAlertTypes = async (req, res) => {
  try {
    const types = await AlertType.find().select('_id name');
    res.json({ types });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch alert types' });
  }
};

