// rateLimitConfig.js
import { authConfig } from './authConfig.js';

export const rateLimitConfig = {
  global: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300, // Max requests per IP per window
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  },

  roleBasedLimits: {
    [authConfig.roles.admin]: {
      windowMs: 5 * 60 * 1000,
      max: 1000, // Admins have high bandwidth for ops
    },
    [authConfig.roles.auditor]: {
      windowMs: 10 * 60 * 1000,
      max: 300, // Auditors run many AI audits
    },
    [authConfig.roles.user]: {
      windowMs: 10 * 60 * 1000,
      max: 100,
    },
    [authConfig.roles.viewer]: {
      windowMs: 10 * 60 * 1000,
      max: 50,
    }
  },

  endpointSpecific: {
    '/api/audit/run': {
      windowMs: 30 * 60 * 1000, // Heavier endpoint
      max: 20,
      message: 'Too many audit scans. Upgrade your plan or wait.'
    },
    '/api/threat/intel': {
      windowMs: 15 * 60 * 1000,
      max: 100,
    }
  },

  burstControl: {
    enableBurstLimiter: true,
    burstWindowSeconds: 10,
    burstMaxRequests: 20
  },

  logging: {
    enableRateLimitLogs: true,
    logThrottleEvents: true
  }
};
