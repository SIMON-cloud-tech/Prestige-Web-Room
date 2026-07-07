const fs = require('fs');
const path = require('path');
const { sendContactEmail, sendThankYouEmail } = require('../utils/sendEmail');
const { sanitizeInput, validateContactForm, contactRateLimiter } = require('../utils/security');

const dataPath = path.join(__dirname, '../data/contacts.json');

// ─── Helpers ──────────────────────────────────────────
const readContacts = () => {
  try {
    if (!fs.existsSync(dataPath)) {
      fs.writeFileSync(dataPath, JSON.stringify({ contacts: [] }, null, 2));
      return { contacts: [] };
    }
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading contacts:', error);
    return { contacts: [] };
  }
};

const writeContacts = (data) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing contacts:', error);
    return false;
  }
};

// ─── Get all contacts ──────────────────────────────────
const getAllContacts = (req, res) => {
  try {
    const data = readContacts();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load contacts' });
  }
};

// ─── Submit new contact ──────────────────────────────
const submitContact = async (req, res) => {
  // ── Sanitize Input ──
  const sanitized = {
    name: sanitizeInput(req.body.name),
    email: sanitizeInput(req.body.email),
    projectType: sanitizeInput(req.body.projectType),
    budget: sanitizeInput(req.body.budget),
    message: sanitizeInput(req.body.message),
  };

  // ── Validate ──
  const { isValid, errors } = validateContactForm(sanitized);
  if (!isValid) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  try {
    // ── Save to JSON ──
    const data = readContacts();
    const newContact = {
      id: Date.now(),
      ...sanitized,
      submittedAt: new Date().toISOString(),
      status: 'new',
    };
    data.contacts.push(newContact);
    writeContacts(data);

    // ── Send emails ──
    try {
      await sendContactEmail(sanitized);
      await sendThankYouEmail({ name: sanitized.name, email: sanitized.email });
    } catch (emailError) {
      console.error('Email error (non-blocking):', emailError.message);
    }

    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully!',
      contact: newContact,
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    });
  }
};

module.exports = {
  getAllContacts,
  submitContact,
};