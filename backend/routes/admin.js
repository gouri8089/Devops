const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');

// Example protected route (Admin Only)
router.get('/dashboard', authMiddleware, roleMiddleware(['1']), adminController.getDashboardStats);

module.exports = router;
