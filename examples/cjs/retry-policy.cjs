/**
 * Example: Using retry logic with LunexClient (CJS)
 * Demonstrates retries on transient errors.
 */
const { LunexClient } = require('lunex-http');

const client = new LunexClient('https://api.example.com', {}, {
  maxRetries: 3,
  shouldRetry: (response) => [502, 503, 504].includes(response.status),
});

async function run() {
  try {
    const data = await client.getAsync('unstable-endpoint');
    console.log('Data:', data);
  } catch (error) {
    console.error('Request failed after retries:', error);
  }
}

run();