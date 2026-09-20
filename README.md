# Abdul Kheeyan | Full-Stack Developer Portfolio

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-5-000000?logo=express&logoColor=white)
![EJS](https://img.shields.io/badge/Views-EJS-A91E50?logo=ejs&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue)

A server-rendered developer portfolio built with Node.js, Express.js, EJS, MongoDB, and vanilla JavaScript. The website presents Abdul Kheeyan's technical skills, projects, experience, education, contact information, coding profile, and an AI-powered portfolio assistant in a responsive interface.

## Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Highlights](#project-highlights)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Routes](#available-routes)
- [API Reference](#api-reference)
- [Deployment](#deployment)
- [Security Notes](#security-notes)
- [Author](#author)

## Overview

This portfolio is designed as a small full-stack application rather than a collection of static HTML pages. Express handles routing and middleware, EJS renders the page templates, the `public` directory contains browser assets, and MongoDB is configured for database-backed functionality.

The home page includes:

- Responsive hero, skills, projects, and contact sections
- Dark and light theme switching
- Links to GitHub, LinkedIn, X, and LeetCode
- A floating AI portfolio chatbot
- A contact form that opens a pre-filled Gmail compose window
- Project categories for HTML/CSS, JavaScript, and MERN applications

## Features

### Portfolio Experience

- Server-side rendered pages with EJS
- Responsive layouts for desktop, tablet, and mobile screens
- Persistent light/dark theme preference using `localStorage`
- Reusable navigation, social-link, project, and footer patterns
- Resume download endpoint
- Font Awesome icons and animated interface elements

### AI Portfolio Assistant

- Gemini-powered answers about Abdul's skills, projects, education, experience, and contact details
- Quick-reply buttons for common questions
- English, Hindi, and Hinglish-friendly responses
- Short conversation context sent with follow-up questions
- Local keyword-based fallback when the Gemini API is unavailable
- Clickable profile links in chatbot responses
- Responsive chat window with typing indicator and manual resize controls

### Backend Functionality

- Express route handling and static asset serving
- MongoDB connection through Mongoose
- Postverse CRUD API for creating, reading, updating, and deleting posts
- Chatbot API with input validation and bounded conversation history
- Custom 404 page
- Optional Render keep-alive requests

## Technology Stack

### Backend

- Node.js
- Express.js 5
- Mongoose
- EJS
- dotenv
- Google Generative AI SDK

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript
- EJS templates
- Font Awesome

### Database and Services

- MongoDB or MongoDB Atlas
- Google Gemini API
- Gmail compose integration for contact messages

### Tooling

- npm
- Git and GitHub
- Nodemon for development, if installed globally or through a local setup
- Render-compatible environment configuration

## Project Highlights

The portfolio presents the following featured work:

- **MediAI Pro:** An AI-enabled healthcare platform with multi-role workflows, appointment booking, payments, Gemini integration, and WebRTC consultations.
- **CodeVault:** An AI-assisted code analysis concept using GitHub repository data and LLM-powered review workflows.
- **Responsive UI Designs:** HTML and CSS projects focused on layouts, typography, and responsive design.
- **Interactive Web Components:** JavaScript projects including a stopwatch, Tic-Tac-Toe, Rock Paper Scissors, NeoMart, NewsHub, and an expense tracker.
- **Smart Resume Builder:** A browser-based resume creation tool with editable sections and export functionality.

## Project Structure

```text
POTFOLIO/
├── index.js                 # Express application, routes, APIs, and server startup
├── package.json             # Project metadata and dependencies
├── package-lock.json        # Locked dependency versions
├── models/
│   └── contactModel.js      # Mongoose contact schema
├── public/                  # Static browser assets served by Express
│   ├── *.css                # Page-specific stylesheets
│   ├── image/               # Portfolio and project images
│   └── js/                  # Browser-side scripts and chatbot logic
├── views/                   # EJS page templates
│   └── partials/            # Shared EJS templates
├── .env                    # Local secrets and environment configuration
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- A MongoDB connection string for database-backed features
- A Google Gemini API key for AI chatbot responses

### Installation

```bash
git clone https://github.com/abdul-kheeyan/Abdul-Kheeyan-Portfolio.git
cd Abdul-Kheeyan-Portfolio
npm install
```

## Environment Variables

### Configure the Environment

Create a `.env` file in the project root. Use the following template:

```env
PORT=8080
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>
GEMINI_API_KEY=your_google_gemini_api_key
MY_EMAIL=your_email@example.com
RENDER_EXTERNAL_URL=https://your-service.onrender.com
```

`RENDER_EXTERNAL_URL` is optional and is only used to enable the Render keep-alive request. Never commit `.env` or expose API keys in frontend code.

### Run the Application

```bash
npm start
```

Open [http://localhost:8080/home](http://localhost:8080/home) in your browser.

For development, you can run the server with Nodemon if it is available in your environment:

```bash
nodemon index.js
```

## Available Routes

| Route | Description |
| --- | --- |
| `/home` | Main portfolio page |
| `/htmlcss-projects` | HTML and CSS project collection |
| `/htmlcssjs-project` | HTML, CSS, and JavaScript project collection |
| `/mern-projects` | MERN project collection |
| `/download-resume` | Downloads the resume PDF |
| `/recipe` | Recipe project |
| `/flexmart` | FlexMart project |
| `/pixelkart` | PixelKart project |
| `/amazon` | Amazon-style project |
| `/stopwacth` | Stopwatch project |
| `/tictaktio` | Tic-Tac-Toe project |
| `/rockpeparscissor` | Rock Paper Scissors project |
| `/neomart` | NeoMart project |
| `/wanderlust` | Wanderlust project |
| `/resume` | Resume Builder project |
| `/Expense` | Expense Tracker project |
| `/NewsHub` | NewsHub project |
| `/postverse` | Postverse project |

## API Reference

### Chatbot

`POST /api/chat`

Request body:

```json
{
  "message": "What projects has Abdul built?",
  "history": [
    { "role": "user", "content": "Tell me about Abdul" },
    { "role": "assistant", "content": "Abdul is a Full Stack Developer..." }
  ]
}
```

The message is limited to 500 characters. The API returns a Gemini response when available and uses a local portfolio-specific fallback if the Gemini request fails.

Successful response:

```json
{
  "reply": "Abdul has built several production-grade projects..."
}
```

### Postverse Posts

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/posts` | Return all posts |
| `POST` | `/api/posts` | Create a post with `username`, `caption`, and optional `imageUrl` |
| `PUT` | `/api/posts/:id` | Update a post caption or image URL |
| `DELETE` | `/api/posts/:id` | Delete a post |

Example create request:

```json
{
  "username": "Abdul",
  "caption": "Building something useful.",
  "imageUrl": "https://example.com/image.jpg"
}
```

## Deployment

The application can be deployed to platforms that support Node.js web services, including Render.

1. Push the repository to GitHub.
2. Create a Node.js web service on the hosting platform.
3. Set the build command to `npm install`.
4. Set the start command to `npm start`.
5. Add `PORT`, `MONGO_URI`, `GEMINI_API_KEY`, and `MY_EMAIL` as environment variables.
6. Add `RENDER_EXTERNAL_URL` only when deploying on Render and keep-alive behavior is required.

The server uses the hosting platform's `PORT` value when provided and falls back to port `8080` locally.

## Security Notes

- Keep `.env` out of version control.
- Use a MongoDB user with only the permissions required by the application.
- Store the Gemini API key only on the server.
- Keep production dependencies updated.
- Add authentication and persistent storage before exposing Postverse write endpoints publicly.
- Add production rate limiting before making the chatbot endpoint publicly available at scale.

## Future Improvements

- Add persistent chat history for returning visitors.
- Add authentication and authorization for Postverse administration.
- Add automated tests for routes and API behavior.
- Add request rate limiting and structured server logging.
- Move portfolio content into a database or CMS for easier updates.
- Add CI checks for formatting, linting, and security auditing.

## Author

**Abdul Kheeyan**

- GitHub: [github.com/abdul-kheeyan](https://github.com/abdul-kheeyan)
- LinkedIn: [linkedin.com/in/abdul-kheeyan](https://www.linkedin.com/in/abdul-kheeyan)
- LeetCode: [leetcode.com/u/abdul_kheeyan](https://leetcode.com/u/abdul_kheeyan/)
- X: [x.com/ABDUL_KHEEYAN](https://x.com/ABDUL_KHEEYAN)

Built with Node.js, Express.js, EJS, MongoDB, and vanilla JavaScript.
