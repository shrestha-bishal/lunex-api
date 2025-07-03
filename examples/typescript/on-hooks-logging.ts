/**
 * Example: Using lifecycle hooks for request logging with RestClient
 *
 * Demonstrates how to utilize onRequestStart, onRequestEnd, and onRequestError hooks
 * to log detailed information about HTTP requests and responses.
 */

import RestClient, { RestClientOptions } from 'lunex-http';

const options = new RestClientOptions();
options.onRequestStart = (method: string, url: string, options: RequestInit) => {
  console.log(`[Request Start] ${method} ${url}`, options);
};

options.onRequestEnd = (response: Response) => {
  console.log(`[Request End] Status: ${response.status} ${response.statusText}`);
};

options.onRequestError = (error: Error) => {
  console.error(`[Request Error]`, error);
};

const client = new RestClient('https://api.example.com', {}, options);

(async () => {
  try {
    const user = await client.getAsync('users/1');
    console.log('User data:', user);
  } catch (error) {
    console.error('Request failed:', error);
  }
})();