const rateLimit = require('express-rate-limit');
const xss = require('xss');

// ─────────────────────────────────────────────
// 🔒 SANITIZATION
// ─────────────────────────────────────────────
const sanitizeInput = (input) => {
  if (typeof input === 'string') {
    return xss(input.trim());
  }
  if (typeof input === 'object' && input !== null) {
    const sanitized = {};
    for (const [key, value] of Object.entries(input)) {
      sanitized[key] = sanitizeInput(value);
    }
    return sanitized;
  }
  return input;
};

// ─────────────────────────────────────────────
// 🛑 RATE LIMITING
// ─────────────────────────────────────────────
const contactRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30, // 30 requests per IP per hour
  message: {
    error: 'Too many requests. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const generalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP per 15 minutes
  message: {
    error: 'Too many requests. Please slow down.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ─────────────────────────────────────────────
// ✅ INPUT VALIDATION
// ─────────────────────────────────────────────
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateContactForm = (data) => {
  const errors = [];
  const { name, email, message } = data;

  if (!name || name.length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (!email || !validateEmail(email)) {
    errors.push('Please provide a valid email address');
  }

  if (!message || message.length < 10) {
    errors.push('Message must be at least 10 characters');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = {
  sanitizeInput,
  contactRateLimiter,
  generalRateLimiter,
  validateEmail,
  validateContactForm,
};