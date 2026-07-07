# Prestige Web Room

Prestige Web Room is a full-stack website for JAMSI Technologies. It combines a React/Vite frontend with an Express backend to deliver a professional business experience with sections for services, projects, testimonials, blogs, and contact.

## Quick overview

- Modern landing page experience
- Multi-page navigation for services, projects, testimonials, and blogs
- Contact form with backend processing and email support
- Chatbot integration for common customer questions
- Easy content updates through JSON files in the backend

## Getting started

### 1. Install dependencies

```bash
npm install
npm install --prefix frontend
npm install --prefix backend
```

### 2. Set up environment variables

Create a .env file in the backend folder with:

```env
PORT=5000
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=your_sender_email
SENDGRID_TO_EMAIL=your_recipient_email
```

### 3. Run the app

```bash
npm run dev
```

The frontend will run on http://localhost:5173 and the backend on http://localhost:5000.

## Project structure

- frontend/ - React app
- backend/ - Express API and data files

## How the project connects together

The structure is intentionally simple:

1. The frontend is built with React and Vite.
2. The browser loads the UI and navigates between pages using React Router.
3. When a page needs content, it sends a request to the backend API.
4. The Express server receives the request and routes it to the correct feature module.
5. That feature module reads from a JSON file or runs a helper function.
6. The backend sends the response back to the frontend, and the page renders the result.

### Example: loading projects
- The Projects page sends a request to /api/projects
- backend/server.js routes that request to projectRoutes.js
- projectRoutes.js reads from backend/data/projects.json
- The JSON is returned to the frontend and displayed on the page

### Example: submitting a contact form
- The Contact form sends a request to /api/contact
- The contact route passes the data to the controller
- The controller sanitizes and validates the input
- The submission is saved to contacts.json
- An email is then  sent dually through the email utility

### Example: chatbot interaction
- The chatbot sends a request to /api/chatbot
- The chatbot route passes the message to the controller
- The controller uses chatbotParser.js to read the knowledge base and generate a reply
- The reply is returned to the chat component and shown to the user

### Utility files and their roles
- security.js: protects the API with sanitization, validation, and rate limiting
- sendEmail.js: sends contact notifications and thank-you emails
- chatbotParser.js: converts user questions into relevant chatbot responses
- api.js: keeps frontend API calls organized and reusable

## Documentation

More detailed setup information is available in the frontend README.
