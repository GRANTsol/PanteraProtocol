// routes/auditRoutes.js
import express from 'express';
import { createRateLimiter } from '../middleware/rateLimiter.js';
import { rateLimitConfig } from '../config/rateLimitConfig.js';

const router = express.Router();

router.get(
  '/run',
  createRateLimiter(rateLimitConfig.endpointSpecific['/api/audit/run']),
  (req, res) => {
    res.json({ message: 'Audit is running securely.' });
  }
);

export default router;
