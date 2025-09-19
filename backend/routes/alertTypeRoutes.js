const express = require('express');
const router = express.Router();
const {getAlertTypes,getAllAlertTypes} = require('../controllers/alertTypeController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getAllAlertTypes);
router.get('/', authMiddleware, getAlertTypes);
// routes/alertTypeRoutes.js


module.exports = router;
