// logger.js
import winston from 'winston';
import { envConfig } from './envConfig.js';

const { combine, timestamp, printf, colorize, json } = winston.format;

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

// Create logger instance
export const logger = winston.createLogger({
  level: envConfig.NODE_ENV === 'development' ? 'debug' : 'info',
  format: combine(
    timestamp(),
    envConfig.NODE_ENV === 'development' ? colorize() : json(),
    envConfig.NODE_ENV === 'development' ? logFormat : json()
  ),
  transports: [
    new winston.transports.Console(),

    // Optional file logging
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error'
    }),
    new winston.transports.File({
      filename: './logs/combined.log'
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: './logs/exceptions.log' })
  ]
});
