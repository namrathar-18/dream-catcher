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
- **AI**: Anthropic Claude API

## Project Structure

```
dream-journal/
├── server.js           # Express server and API routes
├── package.json        # Dependencies and scripts
├── .env               # Environment variables (create this)
├── .env.example       # Example env file
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

Create a `.env` file in the project root and configure your PostgreSQL connection and Gemini API key:

```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3.6-flash
PORT=3001
```

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

The app will be available at `http://localhost:3001` by default.

## API Endpoints

- `GET /api/dreams` - Get all dreams
- `GET /api/dreams/:id` - Get a specific dream
- `POST /api/dreams` - Create a new dream (requires `dream_text` in body)
- `DELETE /api/dreams/:id` - Delete a dream

## Deployment to Render

### 1. Prepare Your Repository

Make sure your code is in a Git repository (GitHub, GitLab, etc.)

### 2. Create a New Web Service on Render

1. Go to https://render.com and sign in
2. Click "New +" and select "Web Service"
3. Connect your repository
4. Configure the service:
   - **Name**: dream-journal (or your choice)
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 3. Add Environment Variables

In the Render dashboard, add:
- `DATABASE_URL`: Your PostgreSQL connection string
- `GEMINI_API_KEY`: Your Gemini API key
- `GEMINI_MODEL` (optional): Gemini model name

### 4. Deploy

Click "Create Web Service" and Render will deploy your app automatically.

### 5. Database

Configure `DATABASE_URL` with your PostgreSQL connection string in the Render dashboard. For Render PostgreSQL, use the internal URL when the web service and database are in the same region.

## Usage

1. Enter your dream in the text area
2. Click "Get Interpretation" to save the dream and receive an AI interpretation
3. View all your dreams below, sorted by most recent
4. Click "Delete" to remove a dream

## License

MIT