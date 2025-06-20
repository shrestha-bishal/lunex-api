/**
 * Example: Retry logic with custom retry conditions
 * 
 * Shows how to configure the RestClient with retry attempts and
 * a custom shouldRetry function to handle specific HTTP status codes.
 */

import RestClient, { RestClientOptions } from 'rest-client-js';

async function run() {
  const options = new RestClientOptions({
    maxRetries: 5,
    shouldRetry: (response) => [429, 502, 503].includes(response.status), // Retry on 429 and server errors
  });

  const client = new RestClient('https://api.example.com', {}, options);

  try {
    const response = await client.getAsync('resources/123');
    console.log('Got resource:', response);
  } catch (err) {
    console.error('Request failed after retries:', err);
  }
}

run();
