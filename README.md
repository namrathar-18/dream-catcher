# Dream Journal App

A full-stack web application that allows users to record their dreams and receive AI-powered interpretations using Gemini.

## Features

- Record dreams with timestamp
- Get AI interpretations of your dreams
- View all past dreams and their interpretations
- Delete dreams
- PostgreSQL database for persistent storage
- Vanilla JavaScript frontend
- Express backend with RESTful API

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Frontend**: HTML, CSS, Vanilla JavaScript
- **AI**: Google Gemini API

## Project Structure

```
dream-catcher/
├── server.js           # Express server and API routes
├── package.json        # Dependencies and scripts
├── .env.example        # Environment variable template
├── render.yaml         # Render deployment blueprint
└── public/
    ├── index.html     # Frontend HTML
    ├── styles.css     # Styles
    └── app.js         # Frontend JavaScript
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env` and add your PostgreSQL connection and Gemini API key:

The template contains placeholders for:

- `DATABASE_URL`: your PostgreSQL connection string
- `GEMINI_API_KEY`: your Gemini API key
- `GEMINI_MODEL`: a model enabled for your Gemini API key
- `PORT`: optional; defaults to `3001`

Use your database provider's connection string. Keep `.env` private and never commit credentials.
Get a Gemini API key from https://aistudio.google.com/apikey.

### 3. Run the Application

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The app will be available at `http://localhost:3001` by default. `GET /health` checks that the database is reachable.
Run the automated checks with `npm test`.

## API Endpoints

- `GET /api/dreams` - Get all dreams
- `GET /api/dreams/:id` - Get a specific dream
- `POST /api/dreams` - Create a new dream (requires `dream_text` in body)
- `DELETE /api/dreams/:id` - Delete a dream

## Deployment to Render

### 1. Prepare Your Repository

Make sure your code is in a Git repository (GitHub, GitLab, etc.)

### 2. Create a New Web Service on Render

1. Push the repository to GitHub.
2. In Render, choose **New > Blueprint** and connect this repository's `main` branch.
3. Render reads `render.yaml` to configure the web service. Set `DATABASE_URL`, `GEMINI_API_KEY`, and `GEMINI_MODEL` when prompted.

### 4. Deploy

Keep secrets in Render's environment settings, not in GitHub. Render will deploy new commits from the connected branch automatically.

### 5. Database

Configure `DATABASE_URL` with your PostgreSQL connection string in the Render dashboard. For Render PostgreSQL, use the internal URL when the web service and database are in the same region.

## Usage

1. Enter your dream in the text area
2. Click "Get Interpretation" to save the dream and receive an AI interpretation
3. View all your dreams below, sorted by most recent
4. Click "Delete" to remove a dream

## License

MIT