const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');

// Create alert
router.post('/', authMiddleware, alertController.createAlert);

// Get all alerts for user
router.get('/', authMiddleware, alertController.getUserAlerts);

// Admin: Get all alerts
router.get('/all', authMiddleware, roleMiddleware(['Admin']), alertController.getAllAlerts);

// Delete alert
router.delete('/:id', authMiddleware, alertController.deleteAlert);

module.exports = router;
