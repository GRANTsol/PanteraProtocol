// middleware/rateLimiter.js
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';
import { rateLimitConfig } from '../config/rateLimitConfig.js';
import { envConfig } from '../config/envConfig.js';

const redisClient = new Redis({
  host: envConfig.REDIS_HOST,
  port: parseInt(envConfig.REDIS_PORT),
  password: envConfig.REDIS_PASSWORD || undefined,
  enableOfflineQueue: false,
});

export const createRateLimiter = (options = {}) => {
  return rateLimit({
    store: new RedisStore({
      sendCommand: (...args) => redisClient.call(...args),
    }),
    windowMs: options.windowMs || rateLimitConfig.global.windowMs,
    max: options.max || rateLimitConfig.global.max,
    message: options.message || rateLimitConfig.global.message,
    standardHeaders: true,
    legacyHeaders: false,
  });
};
