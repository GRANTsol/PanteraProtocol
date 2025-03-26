// authConfig.js
import { envConfig } from './envConfig.js';

export const authConfig = {
  // JWT settings
  jwt: {
    secret: envConfig.JWT_SECRET,
    expiration: envConfig.TOKEN_EXPIRATION || '1h'
  },

  // Optional refresh token support
  useRefreshTokens: envConfig.USE_REFRESH_TOKENS === 'true',
  refreshTokenExpiration: envConfig.REFRESH_TOKEN_EXPIRATION || '7d',

  // Role-based access defaults
  roles: {
    default: 'user',
    admin: 'admin',
    auditor: 'auditor',
    viewer: 'viewer'
  },

  // OAuth provider settings (expandable)
  oauth: {
    google: {
      enabled: envConfig.ENABLE_GOOGLE_OAUTH === 'true',
      clientId: envConfig.GOOGLE_CLIENT_ID || '',
      clientSecret: envConfig.GOOGLE_CLIENT_SECRET || ''
    },
    github: {
      enabled: envConfig.ENABLE_GITHUB_OAUTH === 'true',
      clientId: envConfig.GITHUB_CLIENT_ID || '',
      clientSecret: envConfig.GITHUB_CLIENT_SECRET || ''
    }
  }
};
