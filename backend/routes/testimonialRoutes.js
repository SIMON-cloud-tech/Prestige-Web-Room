const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/testimonials.json');

// Helper to read testimonials data
const readTestimonialsData = () => {
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
};

// Get all testimonials
router.get('/', (req, res) => {
  try {
    console.log('GET /api/testimonials called');
    const data = readTestimonialsData();
    res.json(data);
  } catch (error) {
    console.error('❌ Error reading testimonials:', error.message);
    res.status(500).json({ error: 'Failed to load testimonials' });
  }
});

module.exports = router;