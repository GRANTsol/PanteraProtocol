// rateLimitConfig.js
import { envConfig } from './envConfig.js';

export const rateLimitConfig = {
  // Global defaults
  global: {
    windowMs: parseInt(envConfig.RATE_LIMIT_WINDOW_MS || '60000'), // 1 min
    maxRequests: parseInt(envConfig.RATE_LIMIT_MAX || '30')         // 30 requests per window
  },

  // Role-based overrides
  roles: {
    admin: {
      windowMs: 60000,
      maxRequests: 100
    },
    auditor: {
      windowMs: 60000,
      maxRequests: 60
    },
    user: {
      windowMs: 60000,
      maxRequests: 30
    },
    viewer: {
      windowMs: 60000,
      maxRequests: 15
    }
  },

  // Optional: Custom settings per endpoint
  endpoints: {
    '/api/audit/scan': {
      windowMs: 300000, // 5 minutes
      maxRequests: 3
    },
    '/api/auth/login': {
      windowMs: 900000, // 15 minutes
      maxRequests: 5
    }
  },

  // Whitelist / Blacklist
  ipWhitelist: (envConfig.IP_WHITELIST || '').split(',').filter(Boolean),
  ipBlacklist: (envConfig.IP_BLACKLIST || '').split(',').filter(Boolean)
};
