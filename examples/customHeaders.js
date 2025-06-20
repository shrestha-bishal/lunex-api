/**
 * Example: Using custom headers and request hooks
 * 
 * Demonstrates how to provide custom headers such as Authorization,
 * and how to use hooks for logging request start, end, and error events.
 */

import RestClient, { RestClientOptions } from 'rest-client-js';

async function run() {
  const options = new RestClientOptions({
    timeout: 15000,
    maxRetries: 3,
    onRequestStart: (method, url) => console.log(`Starting ${method} request to ${url}`),
    onRequestEnd: (response) => console.log(`Request finished with status ${response.status}`),
    onRequestError: (err) => console.error('Request error:', err)
  });

  const client = new RestClient('https://api.example.com', {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN_HERE'
  }, options);

  try {
    const response = await client.getAsync('resources/123');
    console.log('Resource 123:', response);
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
