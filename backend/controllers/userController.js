const Document = require("../models/Document");

exports.addAlert = async (req, res) => {
  try {
    const { item_name, alert_type_id, expiry_date, notes } = req.body;
    const user_id = req.user.id; // From authMiddleware
    const file_path = req.file ? req.file.path : null;

    if (!item_name || !alert_type_id || !expiry_date || !file_path) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newDocument = new Document({
      user_id,
      alert_type_id,
      item_name,
      expiry_date,
      notes,
      file_path
    });

    await newDocument.save();

    res.status(201).json({ message: "Alert added successfully." });
  } catch (err) {
    console.error("Error adding alert:", err);
    res.status(500).json({ message: "Server error while adding alert." });
  }
};
