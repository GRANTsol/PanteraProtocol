// testConfig.js
import { envConfig } from './envConfig.js';

export const testConfig = {
  // Use in-memory DB or separate test DB
  useInMemoryDb: envConfig.TEST_USE_IN_MEMORY_DB === 'true',
  testDbUri: envConfig.TEST_DB_URI || 'mongodb://localhost:27017/pantera_test',

  // Mock external services
  mockAiService: envConfig.MOCK_AI_SERVICE === 'true',
  mockThreatFeeds: envConfig.MOCK_THREAT_FEEDS === 'true',
  mockBlockchainCalls: envConfig.MOCK_BLOCKCHAIN === 'true',

  // Fake tokens, IDs, or constants
  testJwtSecret: envConfig.TEST_JWT_SECRET || 'testsecret123',
  testUserId: envConfig.TEST_USER_ID || 'test-user-id',
  testWalletAddress: envConfig.TEST_WALLET || 'pantera1testwallet',

  // Verbose test logs
  enableVerboseLogs: envConfig.TEST_VERBOSE_LOGS === 'true'
};
