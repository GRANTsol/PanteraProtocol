// server.js
import express from 'express';
import auditRoutes from './routes/auditRoutes.js';
import { createRateLimiter } from './middleware/rateLimiter.js';

const app = express();

// JSON parsing
app.use(express.json());

// Global rate limiter
app.use(createRateLimiter());

// Health check
app.get('/health', (req, res) => {
  res.send('Pantera Protocol backend is live');
});

// Routes
app.use('/api/audit', auditRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
