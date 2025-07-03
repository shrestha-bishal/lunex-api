/**
 * Example: Using retry logic with RestClient (CJS)
 * Demonstrates retries on transient errors.
 */
const { RestClient } = require('lunex-http');

const client = new RestClient('https://api.example.com', {}, {
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