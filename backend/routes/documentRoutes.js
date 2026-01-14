// routes/documentRoutes.js
const express = require('express');
const router = express.Router();
const { getUserDocuments } = require('../controllers/documentController');
const  authenticateUser  = require('../middleware/authMiddleware');

router.get('/my-documents', authenticateUser, getUserDocuments);

module.exports = router;
