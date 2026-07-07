const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const path = require('path');

// ─── Load environment variables ──────────────
dotenv.config();

// ─── Security Utils ──────────────────────────
//const { generalRateLimiter } = require('./utils/security');

// ─── Import Routes ────────────────────────────
const projectRoutes = require('./routes/projectRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const contactRoutes = require('./routes/contactRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const BlogRoutes = require('./routes/BlogRoutes');

// ─── Initialize App ──────────────────────────
const app = express();
const PORT = process.env.PORT || 5000;

// ─── Serve Static Files ──────────────────────
app.use('/images', express.static(path.resolve(__dirname, 'public/images')));

// ─── Security Middleware ──────────────────────
app.use(helmet());
//app.use(generalRateLimiter);

// ─── CORS ──────────────────────────────────────
app.use(cors());

// ─── Body Parsers ─────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── API Routes ────────────────────────────────
app.use('/api/projects', projectRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/blogs', BlogRoutes);

// ─── Health Check ─────────────────────────────
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// ─── Serve React Frontend (Production Only) ────
  // Serve static files from the Vite build
  app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

  // Catch-all for React Router – send all non-API routes to React
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'dist', 'index.html'));
  });

// ─── Global Error Handler ─────────────────────
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ─── Start Server ─────────────────────────────
app.listen(PORT, () => {
  console.log(`Prestige Web Room backend running on port ${PORT}`);
});