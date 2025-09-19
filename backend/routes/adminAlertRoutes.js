const express = require('express');
const router = express.Router();
const adminAlertController = require('../controllers/adminAlertController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', authenticateUser, authorizeRoles(['Admin']), adminAlertController.getAllAlerts);
router.post('/bulk-delete', authenticateUser, authorizeRoles(['Admin']), adminAlertController.bulkDeleteAlerts);
router.post('/bulk-resend', authenticateUser, authorizeRoles(['Admin']), adminAlertController.bulkResendAlerts);

module.exports = router;
// This code defines the routes for managing admin alerts in an Express application.
// It includes routes for getting all alerts, bulk deleting alerts, and bulk resending alerts.