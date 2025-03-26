// threatFeeds.js
import { envConfig } from './envConfig.js';

export const threatFeedsConfig = {
  // List of external threat feed URLs
  feeds: [
    {
      name: 'AbuseIPDB',
      url: 'https://api.abuseipdb.com/api/v2/check',
      apiKey: envConfig.ABUSEIPDB_API_KEY,
      enabled: envConfig.ENABLE_ABUSEIPDB === 'true'
    },
    {
      name: 'CVE Feed',
      url: 'https://cve.circl.lu/api/last',
      enabled: envConfig.ENABLE_CVE_FEED === 'true'
    },
    {
      name: 'PhishTank',
      url: 'https://data.phishtank.com/data/online-valid.json',
      enabled: envConfig.ENABLE_PHISHTANK === 'true'
    },
    {
      name: 'OnChain Threat Intel',
      url: envConfig.ONCHAIN_THREAT_FEED_URL || '',
      enabled: envConfig.ONCHAIN_THREAT_FEED_ENABLED === 'true'
    }
  ],

  // Frequency to refresh feeds (in minutes)
  refreshIntervalMinutes: parseInt(envConfig.THREAT_FEED_REFRESH || '60'),

  // Whether threat detection is active at runtime
  runtimeThreatDetection: envConfig.RUNTIME_THREAT_DETECTION === 'true'
};
