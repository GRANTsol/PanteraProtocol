// rateLimiter.js
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';
import { rateLimitConfig } from './rateLimitConfig.js';

// Initialize Redis client
const redisClient = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD || undefined,
  enableOfflineQueue: false
});

// Create a dynamic rate limiter per endpoint
export const createRateLimiter = (options = {}) => {
  return rateLimit({
    store: new RedisStore({
      sendCommand: (...args) => redisClient.call(...args),
    }),
    windowMs: options.windowMs || rateLimitConfig.global.windowMs,
    max: options.max || rateLimitConfig.global.max,
    message: options.message || rateLimitConfig.global.message,
    standardHeaders: rateLimitConfig.global.standardHeaders,
    legacyHeaders: rateLimitConfig.global.legacyHeaders
  });
};
