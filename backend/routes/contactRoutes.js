const express = require('express');
const router = express.Router();
const { getAllContacts, submitContact } = require('../controllers/contactController');
const { contactRateLimiter } = require('../utils/security');

// Public route with stricter rate limiting
router.post('/', contactRateLimiter, submitContact);

// Admin-only route (add authentication later)
router.get('/', getAllContacts);

module.exports = router;