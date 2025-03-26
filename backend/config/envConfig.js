// envConfig.js
import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

// Load .env based on environment
const envPath = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}`);
dotenv.config({ path: envPath });

// Define validation schema
const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  PORT: Joi.number().default(5000),

  // Database
  MONGO_URI: Joi.string().uri().required().label('MONGO_URI'),

  // Solana
  SOLANA_RPC_URL: Joi.string().uri().required().label('SOLANA_RPC_URL'),

  // Auth
  JWT_SECRET: Joi.string().min(10).required().label('JWT_SECRET'),
  TOKEN_EXPIRATION: Joi.string().default('1h'),

  // Threat Intelligence / Alerts
  ALERT_WEBHOOK_URL: Joi.string().uri().allow('').default(''),
  THREAT_FEED_API_KEY: Joi.string().allow('').default(''),

  // AI Model
  MODEL_PATH: Joi.string().default('./models/defaultModel.pkl'),
  ANOMALY_THRESHOLD: Joi.number().min(0).max(1).default(0.75)
}).unknown(true); // Allow extra vars

// Validate
const { value: envVars, error } = envSchema.validate(process.env);

if (error) {
  console.error('❌ Invalid environment configuration:', error.message);
  process.exit(1); // Stop app if critical config is missing
}

// Export validated config
export const envConfig = {
  NODE_ENV: envVars.NODE_ENV,
  PORT: envVars.PORT,

  MONGO_URI: envVars.MONGO_URI,
  SOLANA_RPC_URL: envVars.SOLANA_RPC_URL,

  JWT_SECRET: envVars.JWT_SECRET,
  TOKEN_EXPIRATION: envVars.TOKEN_EXPIRATION,

  ALERT_WEBHOOK_URL: envVars.ALERT_WEBHOOK_URL,
  THREAT_FEED_API_KEY: envVars.THREAT_FEED_API_KEY,

  MODEL_PATH: envVars.MODEL_PATH,
  ANOMALY_THRESHOLD: envVars.ANOMALY_THRESHOLD
};
