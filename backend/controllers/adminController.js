// controllers/adminController.js
const User = require('../models/User');
const Alert = require('../models/Alert');
const Log = require('../models/AlertLog');
const Role = require('../models/Role');
const AlertType = require('../models/AlertType');

const adminController = {

  // Admin Dashboard Stats
  async getDashboardStats(req, res) {
    try {
      const totalUsers = await User.countDocuments();
      const totalAlerts = await Alert.countDocuments();
      const activeUsers = await User.countDocuments({ status: 'active' }); // Optional: use a 'status' field
      const inactiveUsers = totalUsers - activeUsers;
      const alertsSentToday = await Alert.countDocuments({
        is_sent: true,
        alert_date: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          $lte: new Date(new Date().setHours(23, 59, 59, 999))
        }
      });

      const recentLogs = await Log.find().sort({ sent_at: -1 }).limit(10);

      res.json({
        totalUsers,
        totalAlerts,
        activeUsers,
        inactiveUsers,
        alertsSentToday,
        recentLogs
      });
    } catch (err) {
      console.error('Admin dashboard error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // For graph: Alerts grouped by type
  async getAlertsByType(req, res) {
    try {
      const data = await Alert.aggregate([
        {
          $group: {
            _id: "$alert_method",
            count: { $sum: 1 }
          }
        }
      ]);
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error generating graph data' });
    }
  },

  // For graph: Users grouped by role
  async getUsersByRole(req, res) {
    try {
      const data = await User.aggregate([
        {
          $group: {
            _id: "$role_id",
            count: { $sum: 1 }
          }
        }
      ]);
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching user roles data' });
    }
  }
};

module.exports = adminController;
