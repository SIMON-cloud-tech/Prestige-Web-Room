const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/blogs.json');

// ─── Helper: Read blogs data ─────────────────────
const readBlogsData = () => {
  try {
    // Check if file exists
    if (!fs.existsSync(dataPath)) {
      console.warn('⚠️ blogs.json not found, creating empty file');
      fs.writeFileSync(dataPath, JSON.stringify({ blogs: [] }, null, 2));
      return { blogs: [] };
    }
    
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('❌ Error reading blogs data:', error.message);
    throw new Error('Failed to read blogs data');
  }
};

// ─── Get all blogs ──────────────────────────────
const getAllBlogs = (req, res) => {
  try {
    console.log('✅ GET /api/blogs called');
    const data = readBlogsData();
    res.json(data);
  } catch (error) {
    console.error('❌ Error in getAllBlogs:', error.message);
    res.status(500).json({ error: 'Failed to load blogs' });
  }
};

// ─── Get single blog by slug ────────────────────
const getBlogBySlug = (req, res) => {
  try {
    const { slug } = req.params;
    console.log(`✅ GET /api/blogs/${slug} called`);
    
    const data = readBlogsData();
    const blog = data.blogs.find(b => b.slug === slug);
    
    if (!blog) {
      return res.status(404).json({ error: `Blog with slug "${slug}" not found` });
    }
    
    res.json(blog);
  } catch (error) {
    console.error('❌ Error in getBlogBySlug:', error.message);
    res.status(500).json({ error: 'Failed to load blog' });
  }
};

// ─── Get latest blogs ────────────────────────────
const getLatestBlogs = (req, res) => {
  try {
    console.log('✅ GET /api/blogs/latest called');
    const data = readBlogsData();
    
    // Filter blogs where latest === true
    // If no latest flag, return the 3 most recent by date
    let latestBlogs = data.blogs.filter(b => b.latest === true);
    
    // If no blogs marked as latest, get the 3 most recent
    if (latestBlogs.length === 0) {
      latestBlogs = data.blogs
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);
    }
    
    res.json({ blogs: latestBlogs });
  } catch (error) {
    console.error('❌ Error in getLatestBlogs:', error.message);
    res.status(500).json({ error: 'Failed to load latest blogs' });
  }
};

module.exports = {
  getAllBlogs,
  getBlogBySlug,
  getLatestBlogs,
};