// routes/preferencesRoutes.js
const express = require('express');
const router = express.Router();
const { savePreferences } = require('../controllers/preferencesController');
const  authenticateUser  = require('../middleware/authMiddleware');

router.post('/', authenticateUser, savePreferences);

module.exports = router;
