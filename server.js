import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import helmet from 'helmet';
import pool from './config/database.js';
import { initDatabase } from './config/database-init.js';
import dreamsRouter from './routes/dreams.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      'style-src': ["'self'", 'https://fonts.googleapis.com'],
      'font-src': ["'self'", 'https://fonts.gstatic.com']
    }
  }
}));

const PORT = Number(process.env.PORT) || 3001;
 
// Middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.static(join(__dirname, 'public')));

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok' });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(503).json({ status: 'unavailable' });
  }
});

// API Routes
app.use('/api/dreams', dreamsRouter);

app.use((error, req, res, next) => {
  console.error('Request parsing error:', error);
  const status = error.status === 400 || error.status === 413 ? error.status : 500;
  res.status(status).json({
    error: status === 413
      ? 'Request body is too large'
      : status === 400
        ? 'Invalid JSON request body'
        : 'Internal server error'
  });
});

// Initialize database then start server
try {
  await initDatabase();

  const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  server.on('error', async (error) => {
    console.error(`Failed to listen on port ${PORT}:`, error);
    await pool.end();
    process.exit(1);
  });
} catch (error) {
  console.error('Failed to start server:', error);
  await pool.end();
  process.exit(1);
}