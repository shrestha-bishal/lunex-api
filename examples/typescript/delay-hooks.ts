/**
 * Example: Using custom delay function with LunexClientOptions (TypeScript)
 *
 * Demonstrates how to configure a custom delayFn for retry backoff,
 * along with onRequestStart, onRequestEnd, and onRequestError hooks
 * to log HTTP request activity.
 */

import RestClient, { LunexClientOptions } from 'lunex-http';

// Custom delay function for retry logging
const customDelay = async (ms: number): Promise<void> => {
  console.log(`[Retry Delay] Waiting for ${ms}ms...`);
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Configure options
const options = new LunexClientOptions({
  timeout: 5000,
  maxRetries: 3,
  delayFn: customDelay,
});

options.onRequestStart = (method: string, url: string, options: RequestInit) => {
  console.log(`[Request Start] ${method} ${url}`, options);
};

options.onRequestEnd = (response: Response) => {
  console.log(`[Request End] Status: ${response.status} ${response.statusText}`);
};

options.onRequestError = (error: unknown) => {
  console.error(`[Request Error]`, error);
};

const client = new RestClient('https://api.example.com', {}, options);

// Make a GET request
(async () => {
  try {
    const post = await client.getAsync('users/1');
    console.log('Post data:', post);
  } catch (error) {
    console.error('Request failed:', error);
  }
})();
