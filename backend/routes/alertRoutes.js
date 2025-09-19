const express = require('express');
const router = express.Router();
const {
  createAlert,
  getMyAlerts,
  deleteAlert,
} = require('../controllers/alertController');
const authenticate = require('../middleware/authMiddleware');

// Create alert
router.post('/add', authenticate, createAlert);

// Get all alerts for the logged-in user
router.get('/my-alerts', authenticate, getMyAlerts);

// Delete a specific alert by ID (only for the owner)
router.delete('/:id', authenticate, deleteAlert);

module.exports = router;
