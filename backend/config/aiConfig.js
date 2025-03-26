// aiConfig.js
import { envConfig } from './envConfig.js';

export const aiConfig = {
  // Location of the trained model file
  modelPath: envConfig.MODEL_PATH,

  // Whether to use a local model or call an external AI service
  useExternalService: envConfig.USE_EXTERNAL_AI === 'true',

  // Endpoint for external model API (if applicable)
  externalServiceUrl: envConfig.EXTERNAL_AI_URL || 'http://localhost:9000/predict',

  // Prediction sensitivity
  anomalyThreshold: parseFloat(envConfig.ANOMALY_THRESHOLD || 0.75),

  // Retraining options
  autoRetrainEnabled: envConfig.AUTO_RETRAIN === 'true',
  retrainFrequencyDays: parseInt(envConfig.RETRAIN_FREQ_DAYS || '7'),

  // Explainability
  explainPredictions: envConfig.EXPLAIN_PREDICTIONS === 'true',

  // Model metadata
  modelVersion: envConfig.MODEL_VERSION || 'v1.0.0',
  modelType: envConfig.MODEL_TYPE || 'random_forest'
};
