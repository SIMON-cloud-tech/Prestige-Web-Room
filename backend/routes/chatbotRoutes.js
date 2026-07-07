const express = require('express');
const router = express.Router();
const { handleChat } = require('../controllers/chatbotController');
const { contactRateLimiter } = require('../utils/security'); // reuse existing limiter

// Apply rate limiting to avoid spam
router.post('/', contactRateLimiter, handleChat);

module.exports = router;