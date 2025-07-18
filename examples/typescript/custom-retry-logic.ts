/**
 * Example: Using custom retry logic with LunexClient
 *
 * This shows how to override the default retry policy to include additional
 * HTTP statuses such as 429 (Too Many Requests).
 */

import LunexClient, { LunexClientOptions } from 'lunex-http';

const customShouldRetry = (response: Response) => {
  // Retry on 502, 503, 504, or 429
  return [502, 503, 504, 429].includes(response.status);
};

const options = new LunexClientOptions();
options.maxRetries = 3;
options.shouldRetry = customShouldRetry;

const client = new LunexClient('https://api.example.com', {}, options);

(async () => {
  try {
    const data = await client.getAsync('users/1');
    console.log('Data fetched with custom retry logic:', data);
  } catch (error) {
    console.error('Request failed after retries:', error);
  }
})();