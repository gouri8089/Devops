const Document = require('../models/Document'); // Make sure to import the Document model
const Alert = require('../models/Alert'); // Make sure to import the Alert model

exports.getUserDocuments = async (req, res) => {
  try {
    // Step 1: Find all item_ids from alerts for this user
    const alertItemIds = await Alert.find({ user_id: req.user.userId }).distinct('item_id');
    //console.log(req.user.userId, alertItemIds);
    // Step 2: Find documents whose _id is in alertItemIds
    const documents = await Document.find({ 
      user_id: req.user.userId, 
      _id: { $in: alertItemIds }
    }).select('_id item_name alert_type_id expiry_date notes file_path createdAt updatedAt');
    if (!documents || documents.length === 0) {
      return res.status(404).json({ message: 'No documents found for this user' });
    }
    res.json({ documents });
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching documents' });
  }
};