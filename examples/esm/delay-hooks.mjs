/**
 * Example: Using custom delay function with RestClientOptions (ESM)
 *
 * Demonstrates how to configure a custom delayFn for retry backoff,
 * along with onRequestStart, onRequestEnd, and onRequestError hooks
 * to log HTTP request activity.
 */

import RestClient, { RestClientOptions } from 'lunex-http';

// Custom delay function for retry logging
const customDelay = async (ms) => {
  console.log(`[Retry Delay] Waiting for ${ms}ms...`);
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Configure options
const options = new RestClientOptions({
  timeout: 5000,
  maxRetries: 3,
  delayFn: customDelay,
});

options.onRequestStart = (method, url, options) => {
  console.log(`[Request Start] ${method} ${url}`, options);
};

options.onRequestEnd = (response) => {
  console.log(`[Request End] Status: ${response.status} ${response.statusText}`);
};

options.onRequestError = (error) => {
  console.error(`[Request Error]`, error);
};

const client = new RestClient('https://api.example.com', {}, options);

// Make a GET request
try {
  const post = await client.getAsync('users/1');
  console.log('Post data:', post);
} catch (error) {
  console.error('Request failed:', error);
}
