const express = require('express');
const router = express.Router();
const { 
  getAllBlogs, 
  getBlogBySlug, 
  getLatestBlogs 
} = require('../controllers/blogController');

// ─── Get all blogs ──────────────────────────────
router.get('/', getAllBlogs);

// ─── Get single blog by slug ────────────────────
router.get('/:slug', getBlogBySlug);

// ─── Get latest blogs ────────────────────────────
router.get('/latest', getLatestBlogs);

module.exports = router;