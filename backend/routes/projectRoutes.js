const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/projects.json');

// Helper to read projects data
const readProjectsData = () => {
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
};

// Get all projects
router.get('/', (req, res) => {
  try {
    console.log("Get/ Fetch Projects api called");
    const data = readProjectsData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load projects' });
  }
});

// Get single project by slug
router.get('/:slug', (req, res) => {
  try {
    const data = readProjectsData();
    const project = data.projects.find(p => p.slug === req.params.slug);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load project' });
  }
});

// Get featured projects
router.get('/featured', (req, res) => {
  try {
    const data = readProjectsData();
    const featured = data.projects.filter(p => p.featured === true);
    res.json({ projects: featured });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load featured projects' });
  }
});

module.exports = router;