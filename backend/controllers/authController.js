const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AlertSetting = require('../models/AlertSetting');
const Document = require('../models/Document');
const SentAlert = require('../models/SentAlert');
const sendEmail = require('../utils/sendEmail');
const Alert = require('../models/Alert'); // Add this at the top


const Role = require('../models/Role'); // Add this at the top

exports.register = async (req, res) => {
  try {
    const { username, email, password, role_id, role_name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    // If role_id is not provided, but role_name is, look up the ObjectId
    let finalRoleId = role_id;
    if (!finalRoleId && role_name) {
      const roleDoc = await Role.findOne({ role_name });
      if (!roleDoc) return res.status(400).json({ message: 'Role not found' });
      finalRoleId = roleDoc._id;
    }

    const user = new User({
      username,
      email,
      password_hash: hashedPassword,
      role_id: finalRoleId,
    });

    await user.save();
    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secretKey', { expiresIn: '1d' });
    // After successful login and before sending the response
    const nowA = new Date();

    // Remove alerts with alert_date before now
    await Alert.deleteMany({ user_id: user._id, alert_date: { $lt: nowA } });
    // 🔔 Check alert preferences and send due alerts
    const preferences = await AlertSetting.find({ user_id: user._id }).populate('document_id');
    const now = new Date();
    const alertsToSend = [];

    for (const pref of preferences) {
      const doc = pref.document_id;
      if (!doc || !doc.expiry_date) continue;

      const expiry = new Date(doc.expiry_date);
      const leadDate = new Date(expiry);

      switch (pref.lead_time_unit) {
        case 'years': leadDate.setFullYear(leadDate.getFullYear() - pref.lead_time_value); break;
        case 'months': leadDate.setMonth(leadDate.getMonth() - pref.lead_time_value); break;
        case 'weeks': leadDate.setDate(leadDate.getDate() - 7 * pref.lead_time_value); break;
        case 'days': leadDate.setDate(leadDate.getDate() - pref.lead_time_value); break;
      }

      const isToday = now.toDateString() === leadDate.toDateString();
      if (!isToday) continue;

      const alreadySent = await SentAlert.findOne({
        user_id: user._id,
        document_id: doc._id,
        alert_type: pref.alert_type,
        alert_date: doc.expiry_date
      });

      if (!alreadySent) {
  alertsToSend.push({
    document: doc.item_name,
    expiry_date: doc.expiry_date,
    alert_type: pref.preferred_method
  });

  await SentAlert.create({
    user_id: user._id,
    document_id: doc._id,
    alert_type: pref.preferred_method,
    alert_date: doc.expiry_date,
    sent_at: new Date()
  });

  if (pref.preferred_method === 'email' && Alert.is_sent === false) {
    await sendEmail(
      user.email,
      `Reminder: ${doc.item_name} is expiring soon`,
      `Hello ${user.username},\n\nYour document "${doc.item_name}" is set to expire on ${new Date(doc.expiry_date).toLocaleDateString()}.\nPlease take the necessary action.\n\n- Alert System`
    );

    // Update is_sent in Alert table
  const result = await Alert.updateOne(
    {
      // item_id: doc._id,
      user_id: user._id,
      alert_date: doc.expiry_date
    },
    { $set: { is_sent: true } }
   
  );
   console.log(`Email sent for document for ${doc._id} with ${doc.item_name} and ${doc.expiry_date} with result:`, result);
}
}

    }
//console.log(token, alertsToSend // frontend can show push if needed);
    // ✅ Send back login response
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role_id: user.role_id,
        email: user.email
      },
      alerts: alertsToSend // frontend can show push if needed
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

