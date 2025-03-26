// envConfig.js
import dotenv from 'dotenv';
import path from 'path';

// Load .env file based on environment
const envPath = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}`);
dotenv.config({ path: envPath });

// Export all environment variables with fallback defaults
export const envConfig = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,

  // Database
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/pantera',

  // Solana / RPC
  SOLANA_RPC_URL: process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',

  // Security / Auth
  JWT_SECRET: process.env.JWT_SECRET || 'change_this_secret',
  TOKEN_EXPIRATION: process.env.TOKEN_EXPIRATION || '1h',

  // External Services
  ALERT_WEBHOOK_URL: process.env.ALERT_WEBHOOK_URL || '',
  THREAT_FEED_API_KEY: process.env.THREAT_FEED_API_KEY || '',

  // AI Model Config
  MODEL_PATH: process.env.MODEL_PATH || './models/defaultModel.pkl',
  ANOMALY_THRESHOLD: process.env.ANOMALY_THRESHOLD || 0.75
};
