# Prestige Web Room

Prestige Web Room is a modern business website built for JAMSI Technologies. It combines a polished React frontend with a Node.js and Express backend to present services, projects, testimonials, blogs, and a contact experience in a single, easy-to-navigate platform.

This project is designed to be simple for clients to understand and simple for developers to extend. Most of the website content is stored in JSON files in the backend, which means you can update content such as projects, testimonials, and blog posts without changing the UI code every time.

## What this project includes

- A responsive landing page with sections for:
  - Hero content
  - Process overview
  - Services
  - Featured projects
  - Testimonials
  - Contact form
  - Blog highlights
- Dedicated pages for services, projects, testimonials, blogs, and contact information
- Detailed service and project pages using route-based slugs
- A chatbot that answers common questions based on a local knowledge source
- A backend contact system that saves submissions and can send email notifications
- Security features such as rate limiting, input sanitization, and security headers

## Tech stack

### Frontend
- React
- Vite
- React Router DOM
- React Icons
- Axios

### Backend
- Node.js
- Express
- CORS
- Helmet
- dotenv
- Express rate limiting
- SendGrid for email delivery
- XSS sanitization helpers

## Project structure

- frontend/ - React application and user interface
  - src/components/ - reusable UI sections and page components
  - src/pages/ - route-based pages such as Home, Services, Projects, and Contact
  - src/App.jsx - main routing setup
- backend/ - Express server and API logic
  - controllers/ - request handlers for blogs, chatbot, contact, and projects
  - routes/ - API endpoints
  - data/ - JSON files that power the website content
  - utils/ - email, security, and chatbot parsing helpers

## Prerequisites

Make sure you have the following installed:
- Node.js 18 or newer
- npm

## Installation

1. Open the project folder.
2. Install the root dependencies:
   ```bash
   npm install
   ```
3. Install the frontend dependencies:
   ```bash
   npm install --prefix frontend
   ```
4. Install the backend dependencies:
   ```bash
   npm install --prefix backend
   ```

## Environment variables

Create a .env file inside the backend folder and add the following values:

```env
PORT=5000
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=your_sender_email
SENDGRID_TO_EMAIL=your_recipient_email
```

If email sending is not configured, the contact form can still save submissions locally, but email delivery may be skipped.

## Running the project

To start both the frontend and backend together, run:

```bash
npm run dev
```

This will launch:
- The frontend on http://localhost:5173
- The backend on http://localhost:5000

You can also run each part separately if needed:

```bash
npm run dev --prefix frontend
node backend/server.js
```

## Available scripts

### Root project
- npm run dev - starts the frontend and backend together

### Frontend
- npm run dev - starts the Vite development server
- npm run build - creates a production build
- npm run preview - previews the production build locally

## Main API endpoints

The backend exposes the following routes:

- GET /api/test - health check
- GET /api/projects - fetch all projects
- GET /api/projects/:slug - fetch a single project
- GET /api/projects/featured - fetch featured projects
- GET /api/testimonials - fetch testimonials
- POST /api/contact - submit a contact form message
- GET /api/blogs - fetch all blogs
- GET /api/blogs/:slug - fetch a single blog
- GET /api/blogs/latest - fetch the latest blog entries
- POST /api/chatbot - send a message to the chatbot

## How the data flows through the project

The application works as a small full-stack system. A user interacts with the React frontend, the browser sends a request to the Express backend, the backend reads data from JSON files or runs a helper function, and then sends the result back to the page so it can be displayed.

### 1. Frontend routing and page rendering

The main routing setup lives in frontend/src/App.jsx. This file maps URLs such as /, /projects, /services, /blog, and /contact to the correct page components.

Example:
- Visiting / loads the HomePage component
- Visiting /projects loads the ProjectsPage component
- Visiting /projects/:slug loads the ProjectDetail component
- Visiting /blog/:slug loads the BlogDetail component

These page components then render smaller section components such as Hero, Services, Projects, Testimonials, Contact, and BlogSection.

### 2. How a page connects to the backend

When a page needs dynamic content, it sends a request from the browser to the backend API.

Example flow for projects:
1. The Projects page in frontend/src/components/jsx/Projects.jsx calls fetch('/api/projects')
2. The browser sends that request to the Express server
3. The server receives the request at the route mounted in backend/server.js
4. The request is passed to backend/routes/projectRoutes.js
5. The route uses the controller logic or direct file-reading logic to load data from backend/data/projects.json
6. The backend sends the JSON response back to the frontend
7. The React component renders the returned project data on the page

This same pattern is used for:
- testimonials via /api/testimonials
- blogs via /api/blogs
- contact submissions via /api/contact
- chatbot questions via /api/chatbot

### 3. How each route connects to the server

The main connection point is backend/server.js. This file creates the Express app and mounts each feature-specific router:

- app.use('/api/projects', projectRoutes)
- app.use('/api/testimonials', testimonialRoutes)
- app.use('/api/contact', contactRoutes)
- app.use('/api/chatbot', chatbotRoutes)
- app.use('/api/blogs', BlogRoutes)

That means when the frontend calls /api/projects, the request is handled by the project route module. When it calls /api/contact, it is handled by the contact route module, and so on.

### 4. How the backend uses controllers and data files

The route files are lightweight. Their job is to receive the request and pass it to the appropriate controller or handler.

For example:
- projectRoutes.js handles requests related to projects
- contactRoutes.js handles contact form submissions
- BlogRoutes.js handles blog listing and detail retrieval
- chatbotRoutes.js handles chat requests

The controllers then read the relevant JSON data, perform any necessary logic, and return a response. The JSON files in backend/data/ act like the website’s content database for this project.

### 5. How the utility files help

The util files are supporting modules that handle special responsibilities:

- backend/utils/security.js
  - sanitizes user input to prevent harmful content
  - validates the contact form fields
  - applies rate limiting to protect the API

- backend/utils/sendEmail.js
  - sends email notifications when a contact form is submitted
  - sends a thank-you message to the person who filled the form

- backend/utils/chatbotParser.js
  - reads the knowledge base from chatbot-knowledge.json
  - extracts keywords from the user message
  - matches the message to the best known intent
  - returns a helpful chatbot reply

- frontend/src/utils/api.js
  - provides a small central place for API request helpers
  - keeps the frontend API calls organized and easier to reuse

### 6. Static content versus dynamic content

Not everything comes from the backend API.

- Services content is loaded from public/data/services.json, which is a static public file served by Vite
- Projects, testimonials, blogs, and chatbot knowledge are handled through the backend API and JSON files

This split keeps the site flexible: fixed content like service information can be served quickly from the public folder, while more dynamic content can be managed through the Express backend.

## Content management

Content is mostly stored in JSON files under the backend data folder, including:
- projects.json
- testimonials.json
- blogs.json
- contacts.json
- chatbot-knowledge.json

This makes it easier to update site content without editing React components every time.

## Notes for contributors

- Keep the UI components organized under frontend/src/components/
- Add new pages in frontend/src/pages/ and register them in frontend/src/App.jsx
- Use the backend data files for content changes whenever possible
- Follow the existing structure when adding new API routes or controllers

## Summary

Prestige Web Room is a full-stack website that brings together modern frontend design, content-driven backend APIs, contact handling, blog support, and a simple chatbot experience. It is a strong foundation for a professional business website that can grow over time.
